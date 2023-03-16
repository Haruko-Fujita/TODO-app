import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <title>Todo app</title>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <meta name="msapplication-TileColor" content="#ffffff"></meta>
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>

      <header>
        <h1>Todo list</h1>
      </header>

      <main>{children}</main>

      <footer>
        <Link href="/">
          Home
        </Link>
      </footer>
    </div>
  );
}
