export const brands = [
  '765AS',
  'DearlyStars',
  'CinderellaGirls',
  'MillionLive',
  'SideM',
  'ShinyColors',
  'RADIO',
  'KR',
  'XENOGLOSSIA',
  'Unknown',
].sort();

export interface Music {
  brand: string;
  name: string;
  release: string;
}

const scheme = 'https';
const port: number = 80;
export const endpoints = {
  music: `${scheme}://imas-random-list.deno.dev${port === 80 ? '' : `:${port}`}/music`,
};
