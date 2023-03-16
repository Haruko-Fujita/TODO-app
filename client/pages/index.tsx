import Layout from "@/components/Layout";
import Title from "@/components/Title";
import ListRow from "@/components/ListRow";
import FormAdd from "@/components/FormAdd";
import FormUpdate from "@/components/FormUpdate";
import ButtonBlue from "@/components/ButtonBlue";
import ButtonGray from "@/components/ButtonGray";
import "tailwindcss/tailwind.css";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
const qs = require("qs");

interface Todo {
  id: number;
  content: string;
  typeID: number;
  statusID: number;
}

// 全todo取得API呼び出し
const getAllTodo = async () => {
  return await axios
    .get(process.env.NEXT_PUBLIC_ENDPOINT)
    .then((res) => res.data);
};

// 読み込み時にAPIからtodoデータを取得
export async function getServerSideProps() {
  const allTodo = await getAllTodo();
  return {
    props: { allTodo },
  };
}

export default function Home({ allTodo }) {
  const router = useRouter();

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) return null;

  // todo削除API呼び出し
  const clickDelete = async (id: number) => {
    axios
      .delete(process.env.NEXT_PUBLIC_ENDPOINT + id)
      .then((res) => {
        router.reload();
        console.log(JSON.stringify(res.data));
      })
      .catch((error) => {
        console.log("error: ", error);
        return;
      });
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
                    <a className="text-blue-500 hover:text-blue-700" href="#">
                      <ButtonBlue>
                        <Link href={`/${todo.id}`}>編集</Link>
                      </ButtonBlue>
                      <ButtonGray>
                        <div onClick={() => clickDelete(todo.id)}>削除</div>
                      </ButtonGray>
                    </a>
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
