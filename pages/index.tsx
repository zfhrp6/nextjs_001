import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Resetter, SetterOrUpdater, useRecoilState, useResetRecoilState } from "recoil";
import { idolsState, numberState, songsState, parametersState } from '../const/atoms';
import axios from 'axios';
import { ChangeEvent } from 'react';
import { endpoints, brands } from '../const/consts';
import { Idol, Music } from '../types/types';

const SelectProduction = (name: string, idx: number, productions: string[], onChange: Function): JSX.Element => {
  const onChangeSelection = (ev: ChangeEvent<HTMLInputElement>) => {
    const v = ev.target.value;
    if (productions.includes(v)) {
      onChange(productions.filter(p => p != v))
    }
    else {
      onChange([...productions, v])
    }
  }
  const isSelected = productions.includes(name);

  return (
    <div key={idx}>
      <input type="checkbox" id={name} name='production' value={name} checked={isSelected} onChange={onChangeSelection} />
      <label htmlFor={name}>{name}</label>
    </div>
  )
}

interface ParameterBoxProps {
  val: string[];
  setProduction: (s: string[]) => void;
}

const ParameterBox = ({ val, setProduction }: ParameterBoxProps): JSX.Element => {
  const isSelectedAll = val.length == brands.length;
  const toggleAllSelection = () => { setProduction(isSelectedAll ? [] : brands); };

  return (
    <div>
      <div>
        <input type="checkbox" id="ALL" name='all-production' value="ぜんぶ" checked={isSelectedAll} onChange={toggleAllSelection} />
        <label htmlFor="ALL">ぜんぶ</label>
      </div>
      {brands.map((p, idx) => SelectProduction(p, idx, val, setProduction))}
    </div>
  )
}

interface QueryProps {
  number: number;
  brands: readonly string[];
  setSongs: SetterOrUpdater<Music[]>;
  setIdols: SetterOrUpdater<Idol[]>;
}

const Query = ({ setSongs, setIdols, number, brands }: QueryProps): JSX.Element => {
  const query = async () => {
    try {
      // TODO: 雑に2種類(Song,Idol)を並べているので整理する
      const songRes = await axios.post(endpoints.music, { number, brands });
      const songData = songRes.data.payload as Music[];
      console.log(songData);
      const songNames = songData.map((d) => d.name);
      console.log(songNames);
      setSongs(songData);

      const idolRes = await axios.post(endpoints.idol, { number, brands });
      const idolData = idolRes.data.payload as Idol[];
      console.log(idolData);
      const idolNames = idolData.map((d) => d.name);
      console.log(idolNames);
      setIdols(idolData);
    }
    catch (err) {
      console.log(err);
      alert("バグです");
    }
  }

  return (
    <div>
      <button onClick={query}>検索</button>
    </div>
  )
}

interface ResultProps {
  songs: Music[];
  idols: Idol[];
}

const Result = ({ songs, idols }: ResultProps): JSX.Element => {
  const s = {
    borderBottom: "solid thin black",
  }
  return (
    <div>
      <table style={{ border: 'solid thin' }}>
        <tr>
          <th style={s}>#</th>
          <th style={s}>ブランド</th>
          <th style={s}>曲名</th>
        </tr>
        {songs.map((song, idx) => {
          return (
            <tr key={`table-${idx}-${song.name}`}>
              <td style={s}>{idx}</td>
              <td style={s}>{song.brand}</td>
              <td style={s}>{song.name}</td>
            </tr>
          )
        })}
      </table>
      <table style={{ border: 'solid thin' }}>
        <tr>
          <th style={s}>#</th>
          <th style={s}>ブランド</th>
          <th style={s}>名前</th>
          <th style={s}>アイドル名鑑</th>
        </tr>
        {idols.map((idol, idx) => {
          const idolNumber = (url: string) => url.split('/').pop() ?? '';
          return (
            <tr key={`table-${idx}-${idol.name}`}>
              <td style={s}>{idx}</td>
              <td style={s}>{idol.brand}</td>
              <td style={s}>{idol.name} (<a href={idol.url} target="_blank" rel="noopener noreferrer">アイドル名鑑</a>)</td>
              <td style={s}><a href={idol.url} target="_blank" rel="noopener noreferrer">🕮{idolNumber(idol.url)}</a></td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}

const NumberParameters = ({ number, setNumber }: { number: number, setNumber: SetterOrUpdater<number> }): JSX.Element => {
  return (
    <input type="number" name="number" value={number} onChange={
      (event) => {
        try {
          const a = event.target.valueAsNumber;
          setNumber(a <= 0 ? 0 : a);
        }
        catch (err) {
          console.log(err);
          setNumber(5);
        }
      }
    }></input>
  )
}

const AllClear = ({ fns }: { fns: Resetter[] }): JSX.Element => {
  const clear = () => { fns.forEach(f => f()); }
  return (
    <button onClick={clear}>ぜんぶクリア</button>
  )
}

const Home: NextPage = () => {
  const [songs, setSongs] = useRecoilState(songsState);
  const [idols, setIdols] = useRecoilState(idolsState);
  const [parameters, setParameters] = useRecoilState(parametersState);
  const [number, setNumber] = useRecoilState(numberState);
  const resets = [
    useResetRecoilState(songsState),
    useResetRecoilState(numberState),
    useResetRecoilState(parametersState),
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>imas random list</title>
        <meta name="description" content="see https://imas-random-list.deno.dev" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ParameterBox val={parameters} setProduction={setParameters} />
        <NumberParameters setNumber={setNumber} number={number} />
        {/* TODO: setSongs と setIdols をマージするような何かを作れそう */}
        <Query number={number} brands={parameters} setSongs={setSongs} setIdols={setIdols} />
        <AllClear fns={resets} />
        <Result songs={songs} idols={idols} />
      </main>
    </div>
  )
}

export default Home
