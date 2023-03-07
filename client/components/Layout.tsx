import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <header>
        <h1 className={styles.title}>Todo list</h1>
        <p className={styles.description}></p>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <Link href="/" className={styles.code}>
          Back to Home
        </Link>
      </footer>
    </div>
  );
}
