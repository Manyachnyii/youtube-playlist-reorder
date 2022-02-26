import Head from "next/head";
import "bootstrap/dist/css/bootstrap.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>YouTube playlist parser</title>
      </Head>
      <main className="d-flex align-content-center flex-wrap">
        <Component {...pageProps} />
      </main>
      <style jsx>{`
        main {
          min-height: 100vh;
        }
      `}</style>
    </>
  );
}

export default MyApp;
