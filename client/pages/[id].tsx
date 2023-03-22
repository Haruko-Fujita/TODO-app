import "tailwindcss/tailwind.css";
import Layout from "@/components/Layout";
import Title from "@/components/Title";
import ListRow from "@/components/ListRow";
import FormUpdate from "@/components/FormUpdate";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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

export default function EditTodo({ allTodo }) {
  const router = useRouter();
  const id = router.query.id;
  const todo = allTodo.filter((elem) => elem.id === parseInt(id))[0];
  console.log(2, "id=", id);
  console.log(2, "allTodo=", allTodo);
  console.log(2, "todo=", todo);

  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) return null;

  return (
    <Layout>
      <FormUpdate>TODOを入力</FormUpdate>
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
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
            <ListRow>{todo.id}</ListRow>
            <ListRow>{todo.content}</ListRow>
            <ListRow>{todo.typeID}</ListRow>
            <ListRow>{todo.statusID}</ListRow>
          </tr>
        </tbody>
      </table>
    </Layout>
  );
}
