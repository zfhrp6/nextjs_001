import { Brand } from "../types/types";

export const brandColor = (brand: Brand, alpha: number = 10): string => {
  const a = alpha > 100 ? 100 : alpha < 0 ? 0 : alpha;
  switch (brand) {
    case '765AS':
      return '#f34f6d' + a;
    case 'CinderellaGirls':
      return '#2681c8' + a;
    case 'MillionLive':
      return '#ffc30b' + a;
    case 'SideM':
      return '#0fbe94' + a;
    case 'ShinyColors':
      return '#8dbbff' + a;
    default:
      return 'transparent';
  }
}