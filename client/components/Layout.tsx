// import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className={styles.container}>

      <header>
        <h1 className={styles.title}>
        Todo list
        </h1>
        <p className={styles.description}>
          Week5{' '}
          <code className={styles.code}>Next.js/Express/MySQL</code>
        </p>
      </header>

      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
        <div>
          BootCamp#1 by Ms.Engineer
        </div>
        <div>
          <Link href="/" className={styles.code}>Back to Home</Link>
        </div>
      </footer>

    </div>
  );
}