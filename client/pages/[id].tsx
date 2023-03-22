import "tailwindcss/tailwind.css";
import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

// 指定todo取得API呼び出し
const getTodo = async (id: number) => {
  console.log(1, "id=", id)
  return await axios
    .get(process.env.NEXT_PUBLIC_ENDPOINT + id)
    .then((res) => res.data);
};

// 読み込み時にAPIからtodoデータを取得
export async function getServerSideProps(context) {
  const id = context.params.id;
  console.log(2, "id=", id)
  const todo = await getTodo(id); //id=NaN
  return {
    props: { todo },
  };
}

export default function EditTodo({ todo }) {
  const router = useRouter();
  const id = router.query.id;
  console.log("id=", id)

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) return null;

  return (
    <Layout>
      <div>todo</div>
      <div>{todo.id}</div>
    </Layout>
  );
}
