import CSS from 'csstype';
import axios from 'axios';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { ChangeEvent } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Tooltip } from 'react-tooltip';
import { idolsState, songsState, parametersState } from '../const/atoms';
import styles from '../styles/Home.module.css';
import { ENDPOINTS } from '../const/consts';
import { Brand, Idol, Music, Strategy } from '../types/types';
import { brandColor } from '../utils/util';

const SelectProduction = (brand: Brand, idx: number): JSX.Element => {
  const [parameters, setParameters] = useRecoilState(parametersState);
  const onChangeBrands = (ev: ChangeEvent<HTMLInputElement>) => {
    const v = ev.target.value as Brand;
    if (parameters.brands?.includes(v)) {
      setParameters({ ...parameters, brands: parameters.brands?.filter((p) => p !== v) });
    } else {
      setParameters({ ...parameters, brands: [...parameters.brands, v] });
    }
  };

  const isSelected = parameters.brands?.includes(brand);

  return (
    <div key={idx}>
      <input type='checkbox' id={brand} name='production' value={brand} checked={isSelected} onChange={onChangeBrands} />
      <label htmlFor={brand}>{brand}</label>
    </div>
  );
};

const SelectStrategy = (): JSX.Element => {
  const [parameters, setParameters] = useRecoilState(parametersState);
  const isSelected = (strategy: Strategy) => parameters.strategy === strategy;

  const onChangeStrategy = (ev: ChangeEvent<HTMLInputElement>) => {
    const v = ev.target.value as Strategy;
    setParameters({
      ...parameters,
      strategy: v,
    });
  };

  return (
    <div>
      <fieldset style={{ border: 'none' }}>
        <legend>選択戦略</legend>
        <div data-tip data-for={Strategy.full_flat}>
          <label htmlFor={`${Strategy.full_flat}-strategy`}>
            <input
              type='radio'
              id={`${Strategy.full_flat}-strategy`}
              name='strategy'
              value={Strategy.full_flat}
              checked={isSelected(Strategy.full_flat)}
              onChange={onChangeStrategy}
            />
            {Strategy.full_flat}
          </label>
        </div>
        <Tooltip id={Strategy.full_flat} data-tooltip-place='right' data-tooltip-variant='info'>
          <span>全ての候補の中からランダムに選択します</span>
        </Tooltip>
        <div data-tip data-for={Strategy.brand_flat}>
          <label htmlFor={`${Strategy.brand_flat}-strategy`}>
            <input
              type='radio'
              id={`${Strategy.brand_flat}-strategy`}
              name='strategy'
              value={Strategy.brand_flat}
              checked={isSelected(Strategy.brand_flat)}
              onChange={onChangeStrategy}
            />
            {Strategy.brand_flat}
          </label>
        </div>
        <Tooltip id={Strategy.brand_flat} data-tooltip-place='right' data-tooltip-variant='info'>
          <span>各ブランドを均等に選択します</span>
        </Tooltip>
      </fieldset>
    </div>
  );
};

const ParameterBox = (): JSX.Element => {
  const [parameters, setParameters] = useRecoilState(parametersState);
  const isSelectedAll = parameters.brands?.length === Brand.length;
  const toggleAllSelection = () => {
    setParameters({
      ...parameters,
      brands: isSelectedAll ? [] : Brand as unknown as Brand[],
    });
  };
  const parametersStyle: CSS.Properties = { display: 'flex' };

  return (
    <div style={parametersStyle}>
      <div>
        <fieldset style={{ border: 'none' }}>
          <legend>ブランド選択</legend>
          <div>
            <label htmlFor='ALL'>
              <input
                type='checkbox'
                id='ALL'
                name='all-production'
                value='ぜんぶ'
                checked={isSelectedAll}
                onChange={toggleAllSelection}
              />
              ぜんぶ
            </label>
          </div>
          {Brand.map((p, idx) => SelectProduction(p, idx))}
        </fieldset>
      </div>
      <div>
        <SelectStrategy />
      </div>
    </div>
  );
};

const Query = (): JSX.Element => {
  const parameters = useRecoilValue(parametersState);
  // TODO: setSongs と setIdols をマージするような何かを作れそう
  const setSongs = useSetRecoilState(songsState);
  const setIdols = useSetRecoilState(idolsState);
  const query = async () => {
    try {
      // TODO: 雑に2種類(Song,Idol)を並べているので整理する
      const [songRes, idolRes] = [ENDPOINTS.music, ENDPOINTS.idol]
        .map((e) => axios.post(e, parameters));
      Promise.all([songRes, idolRes]);

      const songData = (await songRes).data.payload as Music[];
      const idolData = (await idolRes).data.payload as Idol[];

      const songNames = songData.map((d) => d.name);
      const idolNames = idolData.map((d) => d.name);
      console.log(songNames);
      console.log(idolNames);

      setSongs(songData);
      setIdols(idolData);
    } catch (err) {
      console.log(err);
      alert('バグです');
    }
  };

  return (
    <div>
      <button type='submit' onClick={query}>検索</button>
    </div>
  );
};

const Result = (): JSX.Element => {
  const songs = useRecoilValue(songsState);
  const idols = useRecoilValue(idolsState);
  const tableBorderStyle: CSS.Properties = { borderBottom: 'solid thin black' };
  const itemRowStyle: CSS.Properties = { height: '30px' };
  const brandColStyle: CSS.Properties = {
    ...tableBorderStyle,
    minWidth: '115px',
    textAlign: 'center',
  };
  const songColStyle: CSS.Properties = {
    ...tableBorderStyle,
    minWidth: '350px',
  };
  const idolNameColStyle: CSS.Properties = {
    ...tableBorderStyle,
    minWidth: '100px',
  };
  const meikanColStyle: CSS.Properties = {
    ...tableBorderStyle,
    textAlign: 'center',
  };
  return (
    <div>
      <table style={{ border: 'solid thin' }}>
        <tr>
          <th style={tableBorderStyle}>#</th>
          <th style={tableBorderStyle}>ブランド</th>
          <th style={tableBorderStyle}>曲名</th>
        </tr>
        {songs.map((song, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <tr style={{ ...itemRowStyle, backgroundColor: brandColor(song.brand as Brand) }} key={`table-${idx}-${song.name}`}>
            <td style={tableBorderStyle}>{idx}</td>
            <td style={brandColStyle}>{song.brand}</td>
            <td style={songColStyle}>{song.name}</td>
          </tr>
        ))}
      </table>
      <table style={{ border: 'solid thin' }}>
        <tr>
          <th style={tableBorderStyle}>#</th>
          <th style={tableBorderStyle}>ブランド</th>
          <th style={tableBorderStyle}>名前</th>
          <th style={tableBorderStyle}>アイドル名鑑(Link)</th>
        </tr>
        {idols.map((idol, idx) => {
          const idolNumber = (url: string) => url.split('/').pop() ?? '';
          return (
            // eslint-disable-next-line react/no-array-index-key
            <tr style={{ ...itemRowStyle, backgroundColor: brandColor(idol.brand as Brand) }} key={`table-${idx}-${idol.name}`}>
              <td style={tableBorderStyle}>{idx}</td>
              <td style={brandColStyle}>{idol.brand}</td>
              <td style={idolNameColStyle}>{idol.name}</td>
              <td style={meikanColStyle}>
                <a href={idol.url} target='_blank' rel='noopener noreferrer'>
                  🕮
                  {idolNumber(idol.url)}
                </a>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

const NumberParameters = (): JSX.Element => {
  const [parameters, setParameters] = useRecoilState(parametersState);
  const handler = (ev: ChangeEvent<HTMLInputElement>) => {
    try {
      let a = ev.target.valueAsNumber;
      a = Number.isNaN(a) ? parameters.number : a;
      a = a <= 0 ? 0 : a;
      setParameters({ ...parameters, number: a });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <label htmlFor='number'>
        検索数&nbsp;&nbsp;
        <input id='number' type='number' name='number' value={parameters.number} onChange={handler} />
      </label>
    </div>
  );
};

const AllClear = (): JSX.Element => {
  const resetParameters = useResetRecoilState(parametersState);
  const resetSongs = useResetRecoilState(songsState);
  const resetIdols = useResetRecoilState(idolsState);
  const clear = () => { [resetParameters, resetIdols, resetSongs].forEach((f) => f()); };
  return (
    <button type='button' onClick={clear}>ぜんぶクリア</button>
  );
};

const Home: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>imas random list</title>
      <meta name='description' content='see https://imas-random-list.deno.dev' />
      <link rel='icon' href='/favicon.ico' />
    </Head>

    <main className={styles.main}>
      <ParameterBox />
      <NumberParameters />
      <Query />
      <AllClear />
      <Result />
    </main>
  </div>
);

export default Home;
