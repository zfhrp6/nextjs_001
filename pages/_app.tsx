import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <RecoilRoot>
    <Component {...pageProps} />
  </RecoilRoot>
);

export default MyApp;
