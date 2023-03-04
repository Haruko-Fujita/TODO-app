import Head from 'next/head'
// import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from "../components/Layout";
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <meta charSet="utf-8" />
        <title>Todo app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.main}>
        <Layout>
          <div className={styles.grid}>

          <Link href="/add" className={styles.card}>
              <h3>wip_SSR</h3>
              <p>pages/add</p>
              <p>入力画面見本/useStateで表示</p>
            </Link>

            <Link href="/ssr" className={styles.card}>
              <h3>ok_SSR</h3>
              <p>pages/ssr</p>
              <p>todo一覧をAPIからgetServersidePropsで表示</p>
            </Link>

            <Link href="/contents" className={styles.card}>
              <h3>ok_SSG</h3>
              <p>pages/contents</p>
              <p>client/db.jsonからgetStaticPropsで表示</p>
            </Link>

            <Link href="http://localhost:5000/todo" className={styles.card}>
              <h3>ok_JSON</h3>
              <p>localhost:5000/todoの表示</p>
            </Link>

            <Link href="/api/hello" className={styles.card}>
              <h3>default</h3>
              <p>/api/helloの表示、1objectのみ</p>
            </Link>

          </div>
        </Layout>
      </header>

    </div>
  )
}
