import Layout from "@/components/Layout";
import Title from "@/components/Title";
import ListRow from "@/components/ListRow";
import FormAdd from "@/components/FormAdd";
import FormUpdate from "@/components/FormUpdate";
import ButtonYellow from "@/components/ButtonYellow";
import ButtonGray from "@/components/ButtonGray";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
const qs = require("qs");

interface Todo {
  id: number;
  content: string;
  typeID: number;
  statusID: number;
}

// todo更新API呼び出し
const putTodo = async (
  id: number,
  content: string,
  typeID: number,
  statusID: number
) => {
  const putParam = qs.stringify({
    content: content,
    typeID: typeID,
    statusID: statusID,
  });
  axios
    .put(process.env.NEXT_PUBLIC_ENDPOINT + id, putParam)
    .then((res) => console.log(JSON.stringify(res.data)))
    .catch((error) => {
      console.log(error);
      return;
    });
};

// todo削除API呼び出し
const delateTodo = async (id: number) => {
  console.log(process.env.NEXT_PUBLIC_ENDPOINT);
  axios
    // .delete(`http://localhost:5000/todo/${id}`)
    .delete(process.env.NEXT_PUBLIC_ENDPOINT + id)
    .then((res) => {
      console.log(JSON.stringify(res.data))
    })
    .catch((error) => {
      console.log("error: ", error);
      return;
    });
};

// 全todo取得API呼び出し
const getAllTodo = async () => {
  return await axios.get(process.env.NEXT_PUBLIC_ENDPOINT).then((res) => res.data);
};

// 読み込み時にAPIからtodoデータを取得
export async function getServerSideProps() {
  const allTodo = await getAllTodo();
  return {
    props: { allTodo },
  };
}

export default function Home({ allTodo }) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) return null;

  // 削除ボタンをクリックしたら呼び出されるイベント
  const clickDelete = (id: number) => {
    delateTodo(id);
  };

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
        <Layout>
          <FormUpdate>TODOを入力</FormUpdate>
          <FormAdd>TODOを入力</FormAdd>
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
            {allTodo.map((todo: Todo, index: number) => {
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
                    {/* <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium"> */}
                      <a className="text-blue-500 hover:text-blue-700" href="#">
                        <ButtonYellow>
                          <Link href={`/${todo.id}`}>編集</Link>
                        </ButtonYellow>
                        <ButtonGray>
                          <div onClick={() => clickDelete(todo.id)}>削除</div>
                        </ButtonGray>
                      </a>
                    {/* </td> */}
                  </tr>
                </tbody>
              );
            })}
          </table>
        </Layout>
      </header>
    </div>
  );
}
