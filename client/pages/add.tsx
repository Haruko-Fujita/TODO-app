import { useState } from "react";
import styles from '../styles/Home.module.css';
import Layout from "../components/Layout";

const App = () => {
  // 作成したtodoを入れておくためのstate
  const [todos, setTodos] = useState([]);
  // フォームに入力された値をtodoに登録するまでに入れておくためのstate
  const [tmpTodo, setTmpTodo] = useState("");

  const addTodo = () => {
    // formの内容が空白の場合はalertを出す
    if (tmpTodo === "") {
      alert("todo内容を入力してください");
      return;
    }
    setTodos([...todos, tmpTodo]);
    setTmpTodo("");
  };

  // todoを削除する処理
  const deleteTodo = index => {
    const newTodos = todos.filter((todo, todoIndex) => {
      return index !== todoIndex;
    });
    setTodos(newTodos);
  };

  return (
    <div className={styles.container}>---add.tsのreturn

      <header className={styles.main}>
        <Layout>---add.tsのLayout
          <div className={styles.grid}>

    <>
      <div className="form">
        <input
          type="text"
          name="todo"
          // formの入力値をtmpTodoで持っておく
          onChange={e => setTmpTodo(e.target.value)}
          value={tmpTodo}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo, index) => {
          return (
            <li key={index}>
              {todo}
              {/* 削除ボタンを追加 */}
              <button onClick={() => deleteTodo(index)}>delete</button>
            </li>
          );
        })}
      </ul>
    </>
    
    </div>
        </Layout>
      </header>
  
    </div>
  );
};

export default App;