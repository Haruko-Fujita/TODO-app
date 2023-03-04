import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import fsPromises from "fs/promises";
import path from "path";

export default function Contents(props) {
  const todoList = props.Todo;
  // [{name: , contents: }, {}, ...]

  return (
    <div className={styles.container}>
      <header className={styles.main}>
        <Layout>
          <div className={styles.grid}>
            {todoList.map((todo, index: number) => (
              <div key={index} className={styles.card}>
                <h3>{todo.content}</h3>
                <p>
                  {todo.typeID}: {todo.type}
                </p>
                <p>
                  {todo.statusID}: {todo.status}
                </p>
              </div>
            ))}
          </div>
        </Layout>
      </header>
    </div>
  );
}

export const getStaticProps = async () => {
  const filePath = path.join(process.cwd(), "db.json");
  const data = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(data);
  // objectData.Todo = {Todo: [{}, {}, ...]} = props

  return {
    props: objectData,
  };
};