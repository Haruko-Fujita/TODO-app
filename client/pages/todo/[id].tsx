import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import axios from "axios";

// 読み込み時にAPIからtodoデータを取得
export async function getServerSideProps() {
  const todo = await getTodo(id);
  return {
    props: { todo },
  };
}

export default function Id({ todo }) {
  const router = useRouter();
  const id = router.query.id;
  console.log(router.query); //{id: '3'}

  // 指定todo取得API呼び出し
  const getTodo = async (id: number) => {
    return await axios.get(process.env.ENDPOINT + id).then((res) => res.data);
  };

  return (
    <Layout>
      <div>
        <h1>{router.query.todo}のPageです</h1>
        <h1>{router.query.id}</h1>
        {todo.map((element, index: number) => {
          return <></>;
        })}
      </div>
    </Layout>
  );
}

// task
// 更新API呼び出し

// 削除API呼び出し
