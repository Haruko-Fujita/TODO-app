import "tailwindcss/tailwind.css";
import Layout from "@/components/Layout";
import Title from "@/components/Title";
import ListRow from "@/components/ListRow";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// // 読み込み時にAPIからtodoデータを取得
// export async function getServerSideProps() {
//   const todo = await getTodo();
//   return {
//     props: { todo },
//   };
// }

export default function EditTodo() {
  const router = useRouter();
  const id = router.query.id;

  const [hydrated, setHydrated] = useState(false);
  const [todo, setTodo] = useState();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
  });

  console.log(id, todo);

  // 全todo取得API呼び出し
  const getTodo = async () => {
    return await axios
      .get(process.env.NEXT_PUBLIC_ENDPOINT + id)
      .then((res) => {
        setTodo(res.data);
        console.log(id, todo);
      });
  };
  getTodo();

  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) return null;

  return (
    <Layout>
      <div>todo</div>
      {/* <div>{todo.id}</div> */}
    </Layout>
  );
}
