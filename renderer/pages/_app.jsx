import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>YouTube playlist parser</title>
      </Head>
      <main className="min-vh-100 d-flex flex-wrap align-content-center">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
