import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "@/components/Layout";
import Todo from "./Todo";
import Link from "next/link";
import "tailwindcss/tailwind.css";
import Title from "@/components/Title";
import ListRow from "@/components/ListRow";
import FormAdd from "@/components/FormAdd";
import FormUpdate from "@/components/FormUpdate";
import ButtonGreen from "@/components/ButtonGreen";
import ButtonYellow from "@/components/ButtonYellow";
import ButtonBlue from "@/components/ButtonBlue";
import ButtonGray from "@/components/ButtonGray";
import axios from "axios";
import { useState } from "react";
const qs = require("qs");

export default function Home() {
  // 全todo取得API呼び出し
  const getAllTodo = async () => {
    return await axios.get(process.env.ENDPOINT).then((res) => {
      res.data;
      console.log("res.data");
      console.log(res.data);
    });
  };
  getAllTodo();

  // const allTodo = getAllTodo();
  // return {
  //   props: { allTodo },
  // };

  return (
    <div className={styles.container}>
      <Head>
        <meta charSet="utf-8" />
        <title>Todo app</title>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
        <meta name="msapplication-TileColor" content="#ffffff"></meta>
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>

      <header className={styles.main}>
        <Layout>
          <Link href="/Todo">
            <h3>作業中_SSR</h3>
          </Link>

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
                                  <ButtonBlue>完了</ButtonBlue>
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
                                    {/* <div onClick={() => clickDelete(index)}>
                                      削除
                                    </div> */}
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
