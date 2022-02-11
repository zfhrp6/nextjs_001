
export const STRATEGIES = ['full-flat', 'brand-flat'] as const;

// TODO: このあたり env から読み込む
const SCHEME = 'https';
const PORT: number = 80;
const HOST = 'imas-random-list.deno.dev';

const API_BASE = `${SCHEME}://${HOST}${PORT === 80 ? '' : `:${PORT}`}`;

export const ENDPOINTS = {
  music: `${API_BASE}/music`,
  idol: `${API_BASE}/idol`,
};
