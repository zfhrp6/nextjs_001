import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Resetter, SetterOrUpdater, useRecoilState, useResetRecoilState } from "recoil";
import { numberState, songsState, parametersState } from '../const/atoms';
import axios from 'axios';
import { ChangeEvent } from 'react';
import { endpoints, brands, Music } from '../const/consts';

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

const ParameterBox = ({ val, setProduction }: { val: string[], setProduction: (s: string[]) => void }): JSX.Element => {
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

const Query = ({ run, number, brands }: { number: number, brands: readonly string[], run: SetterOrUpdater<Music[]> }): JSX.Element => {
  const query = async () => {
    try {
      const res = await axios.post('/api/music', { number, brands });
      const data = res.data.payload as Music[];
      console.log(data);
      const titles = data.map((d) => d.name);
      console.log(titles);
      run(data);
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

const Result = ({ songs }: { songs: Music[] }): JSX.Element => {
  const s = {
    borderBottom: "solid thin black",
  }
  return (
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
        <Query number={number} brands={parameters} run={setSongs} />
        <Result songs={songs} />
        <AllClear fns={resets} />
        {/* <p>list: {songs.map(s => s.name)}</p> */}
        {/* <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>*/}
      </main>

      {/*<footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  )
}

export default Home
