import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { idolsState, songsState, parametersState } from '../const/atoms';
import axios from 'axios';
import { ChangeEvent } from 'react';
import { ENDPOINTS, BRANDS, STRATEGIES } from '../const/consts';
import { Brand, Idol, Music, Strategy } from '../types/types';

const SelectProduction = (brand: Brand, idx: number): JSX.Element => {
  const [parameters, setParameters] = useRecoilState(parametersState);
  const onChangeBrands = (ev: ChangeEvent<HTMLInputElement>) => {
    const v = ev.target.value as Brand;
    if (parameters.brands?.includes(v)) {
      setParameters({ ...parameters, brands: parameters.brands?.filter(p => p != v) })
    }
    else {
      setParameters({ ...parameters, brands: [...parameters.brands, v] })
    }
  }

  const isSelected = parameters.brands?.includes(brand);

  return (
    <div key={idx}>
      <input type="checkbox" id={brand} name='production' value={brand} checked={isSelected} onChange={onChangeBrands} />
      <label htmlFor={brand}>{brand}</label>
    </div>
  )
}

const SelectStrategy = (strategy: Strategy, idx: number): JSX.Element => {
  const [parameters, setParameters] = useRecoilState(parametersState);
  const isSelected = parameters.strategy === strategy;
  const strategyString = strategy as string;

  const onChangeStrategy = (ev: ChangeEvent<HTMLInputElement>) => {
    const v = ev.target.value as Strategy;
    setParameters({
      ...parameters,
      strategy: v,
    });
  }

  return (
    <div key={idx}>
      <input type="radio" id={strategyString} name='production' value={strategyString} checked={isSelected} onChange={onChangeStrategy} />
      <label htmlFor={strategyString}>{strategy}</label>
    </div>
  )

}

const ParameterBox = (): JSX.Element => {
  const [parameters, setParameters] = useRecoilState(parametersState);
  const isSelectedAll = parameters.brands?.length == BRANDS.length;
  const toggleAllSelection = () => {
    setParameters({
      ...parameters,
      brands: isSelectedAll ? [] : BRANDS as unknown as Brand[]
    });
  };

  return (
    <div>
      <div>
        <div>
          <input type="checkbox" id="ALL" name='all-production' value="ぜんぶ" checked={isSelectedAll} onChange={toggleAllSelection} />
          <label htmlFor="ALL">ぜんぶ</label>
        </div>
        {BRANDS.map((p, idx) => SelectProduction(p, idx))}
      </div>
      {STRATEGIES.map((s, idx) => SelectStrategy(s, idx))}
    </div>
  )
}

const Query = (): JSX.Element => {
  const parameters = useRecoilValue(parametersState);
  // TODO: setSongs と setIdols をマージするような何かを作れそう
  const [, setSongs] = useRecoilState(songsState);
  const [, setIdols] = useRecoilState(idolsState);
  const query = async () => {
    try {
      // TODO: 雑に2種類(Song,Idol)を並べているので整理する
      const songRes = axios.post(ENDPOINTS.music, parameters);
      const idolRes = axios.post(ENDPOINTS.idol, parameters);
      Promise.all([songRes, idolRes]);

      const songData = (await songRes).data.payload as Music[];
      console.log(songData);
      const songNames = songData.map((d) => d.name);
      console.log(songNames);

      const idolData = (await idolRes).data.payload as Idol[];
      console.log(idolData);
      const idolNames = idolData.map((d) => d.name);
      console.log(idolNames);

      setSongs(songData);
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

const Result = (): JSX.Element => {
  const songs = useRecoilValue(songsState);
  const idols = useRecoilValue(idolsState);
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

const NumberParameters = (): JSX.Element => {
  const [parameters, setParameters] = useRecoilState(parametersState);
  return (
    <input type="number" name="number" value={parameters.number} onChange={
      (event) => {
        try {
          const a = event.target.valueAsNumber;
          setParameters({
            ...parameters,
            number: a <= 0 ? 0 : a,
          });
        }
        catch (err) { }
      }
    }></input>
  )
}

const AllClear = (): JSX.Element => {
  const resetParameters = useResetRecoilState(parametersState);
  const resetSongs = useResetRecoilState(songsState);
  const resetIdols = useResetRecoilState(idolsState);
  const clear = () => { [resetParameters, resetIdols, resetSongs].forEach(f => f()); }
  return (
    <button onClick={clear}>ぜんぶクリア</button>
  )
}

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>imas random list</title>
        <meta name="description" content="see https://imas-random-list.deno.dev" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ParameterBox />
        <NumberParameters />
        <Query />
        <AllClear />
        <Result />
      </main>
    </div>
  )
}

export default Home
