import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Brand, Idol, Music } from "../types/types";
import { BRANDS } from "./consts";

const { persistAtom } = recoilPersist();

export const idolsState = atom<Idol[]>({
	key: 'idols',
	default: [],
	effects_UNSTABLE: [persistAtom],
})

export const numberState = atom<number>({
	key: 'number',
	default: 5,
	effects_UNSTABLE: [persistAtom],
});

export const songsState = atom<Music[]>({
	key: 'songs',
	default: [],
	effects_UNSTABLE: [persistAtom],
});

export const parametersState = atom<Brand[]>({
	key: 'parameters',
  // identically mapping for type check
	default: BRANDS.map(b => b),
});