import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Idol, Music } from "../types/types";
import { brands } from "./consts";

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

export const parametersState = atom<string[]>({
	key: 'parameters',
	default: brands,
	effects_UNSTABLE: [persistAtom],
});