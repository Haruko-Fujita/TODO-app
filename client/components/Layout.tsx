import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="bg-gradient-to-r from-green-200 to-blue-100 p-2">
      <Head>
        <meta charSet="utf-8" />
        <title>Todo app</title>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <meta name="msapplication-TileColor" content="#ffffff"></meta>
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>

      <header className="flex justify-between items-center mx-2">
        <h1 className="italic mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Todo list</h1>
        <Link href="/" className="mx-8 italic font-bold text-lg underline decoration-solid">
          Home
        </Link>
      </header>

      <main>{children}</main>

      <footer>
      </footer>
    </div>
  );
}
