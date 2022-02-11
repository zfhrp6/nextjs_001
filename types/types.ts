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

// NOTE: manually sorted (except Unknown)
export const Brand = [
  '765AS',
  'CinderellaGirls',
  'DearlyStars',
  'KR',
  'MillionLive',
  'RADIO',
  'ShinyColors',
  'SideM',
  'XENOGLOSSIA',
  'Unknown',
] as const;
export type Brand = typeof Brand[number];

export const Strategy = {
  full_flat: 'full-flat',
  brand_flat: 'brand-flat',
} as const;
export type Strategy = typeof Strategy[keyof typeof Strategy];