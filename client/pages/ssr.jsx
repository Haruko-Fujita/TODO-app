import "tailwindcss/tailwind.css";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Title from "../components/Title";
import ListRow from "../components/ListRow";
import Form from "../components/Form";
import DropDownType from "../components/DropDownType";
import DropDownStatus from "../components/DropDownStatus";
import ButtonGreen from "../components/ButtonGreen";
import ButtonYellow from "../components/ButtonYellow";
import ButtonBlue from "../components/ButtonBlue";
import ButtonGray from "../components/ButtonGray";
import axios from "axios";
import { useState } from "react";
const qs = require("qs");

const ENDPOINT = "http://localhost:5000/todo/";

// 全todo取得API呼び出し
const getTodo = async () => {
  return await axios.get(ENDPOINT).then((res) => res.data);
};

// todo追加API呼び出し
const postTodo = async (content, typeID, statusID) => {
  const postParam = qs.stringify({
    content: content,
    typeID: typeID,
    statusID: statusID,
  });

  axios
    .post(ENDPOINT, postParam)
    .then((res) => console.log(JSON.stringify(res.data)))
    .catch((error) => console.log(error));
};

// todo更新API呼び出し　パラメータを変数にしたい
const putTodo = async (id, content, typeID, statusID) => {
  const putParam = qs.stringify({
    content: content,
    typeID: typeID,
    statusID: statusID,
  });

  axios
    .put(ENDPOINT + id, putParam)
    .then((res) => console.log(JSON.stringify(res.data)))
    .catch((error) => console.log(error));
};

// todo削除API呼び出し　削除するとindexとidがずれるのをどうするか？
const delateTodo = async (id) => {
  axios
    .delete(ENDPOINT + id)
    .then(getTodo())
    .then((res) => console.log(JSON.stringify(res.data)))
    .catch((error) => console.log(error));
};

// 読み込み時にAPIからtodoデータを取得
export async function getServerSideProps() {
  const allTodo = await getTodo();
  return {
    props: { allTodo },
  };
}

// ブラウザへ表示するhtmlを返す
export default function API({ allTodo }) {
  // フォーム入力値をボタン（追加/更新）クリックまでに保持するstate
  const [tmpTodo, setTmpTodo] = useState("");
  const [tmpType, setTmpType] = useState(0);
  const [tmpStatus, setTmpStatus] = useState(0);

  // 追加ボタンをクリックで、API呼び出し関数に値を渡す
  const clickPost = () => {
    if (tmpTodo === "") {
      alert("todoを入力してください");
      return;
    } else if (Number.isNaN(tmpType)) {
      alert("typeを選択してください");
      return;
    } else if (Number.isNaN(tmpStatus)) {
      alert("statusを選択してください");
      return;
    }
    postTodo(tmpTodo, tmpType, tmpStatus);
    // post後に全todoをgetしたい...
  };

  // 更新ボタンをクリックで、API呼び出し関数に値を渡す
  const clickPut = (id) => {
    if (id === "") {
      alert("idを入力してください");
    } else if (tmpTodo === "") {
      alert("todoを入力してください");
      return;
    } else if (Number.isNaN(tmpType)) {
      alert("typeを選択してください");
      return;
    } else if (Number.isNaN(tmpStatus)) {
      alert("statusを選択してください");
      return;
    }
    putTodo(27, tmpTodo, tmpType, tmpStatus);
    // id=27を変数にしたい...
    // post後に全todoをgetしたい...
  };

  // 作成したtodoを保持するstate
  const [todoIdArr, setTodoIdArr] = useState(
    JSON.parse(JSON.stringify(allTodo)).map((todo) => todo.id)
  );

  // 削除ボタンをクリックしたら呼び出されるイベント
  // 削除前のtodoIdArrから、deleteIndexと一致したtodoIDを残せていない
  const clickDelete = (deleteIndex) => {
    const deleteTodoArr = todoIdArr.map((todoID, todoIdArrIndex) => {
      if (deleteIndex === todoIdArrIndex) {
        delateTodo(todoID);
      }
      return deleteIndex !== todoIdArrIndex; //
    });
    setTodoIdArr(deleteTodoArr); // Deleteボタン押した後に画面更新されない
  };

  return (
    <div className={styles.container}>
      <header className={styles.main}>
        <Layout>
          <div className="form">
            <form method="post">
              {/* 入力値をtmpで持っておく */}
              <input
                type="text"
                name="todo"
                value={tmpTodo}
                onChange={(elem) => setTmpTodo(elem.target.value)}
              ></input>
              <select
                id="type"
                size="1"
                onChange={(elem) => setTmpType(elem.target.value)}
              >
                <option value="type">type</option>
                <option value="1">job</option>
                <option value="2">social</option>
                <option value="3">private</option>
              </select>
              <select
                id="status"
                size="1"
                onChange={(elem) => setTmpStatus(elem.target.value)}
              >
                <option>status</option>
                <option value="1">new</option>
                <option value="2">WIP</option>
                <option value="3">completed</option>
              </select>
            </form>
          </div>

          <>
            <div className="flex flex-col">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div className="overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      {/* <thead>
                        <tr>
                          <Title></Title>
                          <Title>
                            <Form>TODOを入力</Form>
                          </Title>
                          <Title>
                            <DropDownType>Type</DropDownType>
                          </Title>
                          <Title>
                            <DropDownStatus>Status</DropDownStatus>
                          </Title>
                          <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                            <a
                              className="text-blue-500 hover:text-blue-700"
                              href="#"
                            >
                              <ButtonGreen onClick={clickPost}>
                                追加
                              </ButtonGreen>
                            </a>
                          </td>
                        </tr>
                      </thead> */}
                      <thead>
                        <tr>
                          <Title>ID</Title>
                          <Title>TODO</Title>
                          <Title>Type</Title>
                          <Title>Status</Title>
                          <Title>Action</Title>
                        </tr>
                      </thead>
                      {allTodo.map((todo, index) => {
                        return (
                          <>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
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
                                    <ButtonBlue>完了</ButtonBlue>
                                    <ButtonYellow onClick={clickPut}>
                                      変更
                                    </ButtonYellow>
                                    <ButtonGray
                                      onClick={() => clickDelete(index)}
                                    >
                                      削除
                                    </ButtonGray>
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                          </>
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
