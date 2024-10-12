import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { MainPc } from '../components/main';

const Home: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>imas random list</title>
      <meta name='description' content='see https://imas-random-list.deno.dev' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <MainPc />
  </div>
);

export default Home;
