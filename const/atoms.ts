import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Brand, Idol, Music, Strategy } from "../types/types";

const { persistAtom } = recoilPersist();

export const idolsState = atom<Idol[]>({
  key: 'idols',
  default: [],
  effects_UNSTABLE: [persistAtom],
})

export const songsState = atom<Music[]>({
  key: 'songs',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export interface Parameters {
  brands: Brand[];
  strategy: Strategy;
  number: number;
}

export const parametersState = atom<Parameters>({
  key: 'parameters',
  // identically mapping for type check
  default: {
    brands: Brand.map(b => b),
    strategy: 'brand-flat',
    number: 5,
  },
  effects_UNSTABLE: [persistAtom],
});