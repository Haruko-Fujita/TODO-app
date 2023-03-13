import "tailwindcss/tailwind.css";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Title from "../components/Title";
import ListRow from "../components/ListRow";
import FormAdd from "../components/FormAdd";
import FormUpdate from "../components/FormUpdate";
// import DropDownType from "../components/DropDownType";
// import DropDownStatus from "../components/DropDownStatus";
// import ButtonGreen from "../components/ButtonGreen";
import ButtonYellow from "../components/ButtonYellow";
// import ButtonBlue from "../components/ButtonBlue";
import ButtonGray from "../components/ButtonGray";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
const qs = require("qs");

// 全todo取得API呼び出し
const getAllTodo = async () => {
  return await axios.get(process.env.ENDPOINT).then((res) => res.data);
};

// todo更新API呼び出し
// task=パラメータを変数にしたい
const putTodo = async (id, content, typeID, statusID) => {
  const putParam = qs.stringify({
    content: content,
    typeID: typeID,
    statusID: statusID,
  });
  axios
    .put(process.env.ENDPOINT + id, putParam)
    .then((res) => console.log(JSON.stringify(res.data)))
    .catch((error) => console.log(error));
};

// todo削除API呼び出し
const delateTodo = async (id) => {
  axios
    .delete(process.env.ENDPOINT + id)
    .then((res) => {console.log(JSON.stringify(res.data))
  })
    .then(await getAllTodo()) // task=再レンダリングされない
    .catch((error) => console.log(error));
};

// 読み込み時にAPIからtodoデータを取得
export async function getServerSideProps() {
  const allTodo = await getAllTodo();
  return {
    props: { allTodo },
  };
}

// ブラウザへ表示するhtmlを返す
export default function API({ allTodo }) {

  // 作成したtodoを保持するstate
  const [todoIdArr, setTodoIdArr] = useState(
    JSON.parse(JSON.stringify(allTodo)).map((todo) => todo.id)
  );

  // 削除ボタンをクリックしたら呼び出されるイベント
  // task=削除前のtodoIdArrから、deleteIndexと一致したtodoIDを残せていない
  const clickDelete = (deleteIndex: number) => {
    const deleteTodoArr = todoIdArr.map(
      (todoID: number, todoIdArrIndex: number) => {
        if (deleteIndex === todoIdArrIndex) {
          delateTodo(todoID);
        }
        return deleteIndex !== todoIdArrIndex;
      }
    );
    setTodoIdArr(deleteTodoArr); // task=Deleteボタン押した後に画面更新されない
  };

  return (
    <div className={styles.container}>
      <header className={styles.main}>
        <Layout>
          <>
            <FormUpdate>TODOを入力</FormUpdate>
            <FormAdd>TODOを入力</FormAdd>
            <div className="flex flex-col">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead>
                        <tr>
                          <Title>ID</Title>
                          <Title>TODO</Title>
                          <Title>Type</Title>
                          <Title>Status</Title>
                          <Title>Action</Title>
                        </tr>
                      </thead>
                      {allTodo.map((todo, index: number) => {
                        return (
                          <tbody
                            key={index}
                            className="divide-y divide-gray-200 dark:divide-gray-700"
                          >
                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                              <ListRow>{todo.id}</ListRow>
                              <ListRow>{todo.content}</ListRow>
                              <ListRow>{todo.typeID}</ListRow>
                              <ListRow>{todo.statusID}</ListRow>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <a
                                  className="text-blue-500 hover:text-blue-700"
                                  href="#"
                                >
                                  {/* <ButtonBlue>完了</ButtonBlue> */}
                                  {/* <ButtonYellow onClick={clickPut}>
                                    <Link
                                      href={{
                                        pathname: "/todo/[id]",
                                        query: { id: todo.id },
                                      }}
                                    >
                                      編集
                                    </Link>
                                  </ButtonYellow> */}
                                  <ButtonGray>
                                    <div onClick={() => clickDelete(index)}>
                                      削除
                                    </div>
                                  </ButtonGray>
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        );
                      })}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
        </Layout>
      </header>
    </div>
  );
}
