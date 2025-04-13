import AppShell from '@/components/layouts/AppShell';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'daterangepicker/daterangepicker.css';
import { useRouter } from 'next/router';
import Script from 'next/script';
import Head from 'next/head';


const disableAppShell = ["/auth/login"];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAuthPage = disableAppShell.includes(router.pathname);

  return (
    <>
      <Head>
        
        {/* Bootstrap Icons */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css"
          rel="stylesheet"
        />
        
      </Head>


      {/* Bootstrap Bundle JS */}
      

      {isAuthPage ? (
        <Component {...pageProps} />
      ) : (
        <AppShell>
          <Component {...pageProps} />
        </AppShell>
      )}
    </>
  );
}
