import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { idolsState, parametersState, songsState } from '../const/atoms';
import { ENDPOINTS } from '../const/consts';
import { Music, Idol } from '../types/types';

export const SongQuery = (): JSX.Element => {
  const parameters = useRecoilValue(parametersState);
  const setSongs = useSetRecoilState(songsState);
  const query = async () => {
    try {
      const songRes = axios.post(ENDPOINTS.music, parameters);

      const songData = (await songRes).data.payload as Music[];

      const songNames = songData.map((d) => d.name);
      console.log(songNames);

      setSongs(songData);
    } catch (err) {
      console.log(err);
      alert('バグです');
    }
  };

  return (
    <div>
      <button type='submit' onClick={query}>曲を検索</button>
    </div>
  );
};

export const IdolQuery = (): JSX.Element => {
  const parameters = useRecoilValue(parametersState);
  const setIdols = useSetRecoilState(idolsState);
  const query = async () => {
    try {
      const idolRes = axios.post(ENDPOINTS.idol, parameters);

      const idolData = (await idolRes).data.payload as Idol[];

      const idolNames = idolData.map((d) => d.name);
      console.log(idolNames);

      setIdols(idolData);
    } catch (err) {
      console.log(err);
      alert('バグです');
    }
  };

  return (
    <div>
      <button type='submit' onClick={query}>アイドルを検索</button>
    </div>
  );
};