import { BRANDS, STRATEGIES } from "../const/consts";

export interface Music {
  brand: string;
  name: string;
  release: string;
}

export interface Idol {
  brand: string;
  name: string;
  url: string;
}

export type Brand = typeof BRANDS[number];

export type Strategy = typeof STRATEGIES[keyof typeof STRATEGIES];