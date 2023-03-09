import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <meta charSet="utf-8" />
        <title>Todo app</title>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <meta name="msapplication-TileColor" content="#ffffff"></meta>
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>

      <header>
        <h1 className={styles.title}>Todo list</h1>
        <p className={styles.description}></p>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <Link href="/Todo" className={styles.code}>
          Go Home
        </Link>
      </footer>
    </div>
  );
}
