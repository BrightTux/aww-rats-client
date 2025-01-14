import type { AppProps } from 'next/app';
import Head from 'next/head';
import FullStory from 'react-fullstory';
import { EthersContextProvider } from '~/components/context/EthersContext';
import '~/styles/index.scss';
import { FULLSTORY_ORG_ID } from '~/config/env';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#fcd446' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='msapplication-TileColor' content='#2b5797' />
        <meta name='theme-color' content='#ffffff' />
      </Head>
      <EthersContextProvider>
        {FULLSTORY_ORG_ID && <FullStory org={FULLSTORY_ORG_ID} />}
        <Component {...pageProps} />
      </EthersContextProvider>
    </>
  );
}
export default MyApp;
