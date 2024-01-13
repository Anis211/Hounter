import "@/styles/globals.css";
import Layout from "./layout";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  if (Component.name == "SignIn" || Component.name == "SignUp") {
    return (
      <>
        <Head>
          <title>Hounter</title>
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Hounter</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
