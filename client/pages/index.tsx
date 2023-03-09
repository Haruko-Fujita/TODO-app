import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Todo from "./Todo";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <meta charSet="utf-8" />
        <title>Todo app</title>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <meta name="msapplication-TileColor" content="#ffffff"></meta>
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>

      <header className={styles.main}>
        <Layout>
          <Link href="/Todo">
            <h3>作業中_SSR</h3>
            {/* <Todo allTodo={undefined}></Todo> */}
          </Link>
        </Layout>
      </header>
    </div>
  );
}
