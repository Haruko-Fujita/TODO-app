import "tailwindcss/tailwind.css";
import Layout from "@/components/Layout";
import Title from "@/components/Title";
import ListRow from "@/components/ListRow";
import FormAdd from "@/components/FormAdd";
import ButtonBlue from "@/components/ButtonBlue";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Todo {
  id: number;
  content: string;
  typeID: number;
  statusID: number;
}

interface allTodo {
  todo: Todo;
}

// 全todo取得API呼び出し
const getAllTodo = async () => {
  return await axios
    .get(process.env.NEXT_PUBLIC_ENDPOINT)
    .then((res) => res.data);
};

// type取得API呼び出し
const getType = async () => {
  return await axios
    .get(process.env.NEXT_PUBLIC_ENDPOINT)
    .then((res) => res.data);
};

// status取得API呼び出し
const getStatus = async () => {
  return await axios
    .get(process.env.NEXT_PUBLIC_ENDPOINT)
    .then((res) => res.data);
};

// 読み込み時にAPIからtodoデータを取得
export async function getServerSideProps() {
  const allTodo: allTodo = await getAllTodo();
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
                        <Link href={`/${todo.id}`}>詳細</Link>
                      </ButtonBlue>
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
