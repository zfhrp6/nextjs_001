import { atom } from "jotai";
import { Brand, Idol, Music, Strategy } from "../types/types";

export const idolsState = atom<Idol[]>([]);

export const songsState = atom<Music[]>([]);

export interface Parameters {
  brands: Brand[];
  strategy: Strategy;
  number: number;
}

export const defaultParametersState = {
  brands: Brand.map(b => b),
  strategy: Strategy.brand_flat,
  number: 5,
}

export const parametersState = atom<Parameters>(defaultParametersState);
