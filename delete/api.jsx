// import axios from "axios";

// SSR
// context = user request に対する response date 
// return {}: server 上で動く操作の設定

// getServerSideProps: node.js上で動く関数
export async function getServerSideProps() {
  const ENDPOINT = 'http://localhost:3003/Dancers';
  // 非同期処理を待機して.then以降を実行。dataをresに格納
  // const jsonData = await axios.get(ENDPOINT).then(res => res.data);
  // console.log(jsonData);

  const res = await fetch(`ENDPOINT`)
  const data = await res.json()
  console.log(data);
  
  return {
    props: { data }
  }
}

export default function API({ data }) {
  console.log(data);

  return (
    <>
      <meta charSet="utf-8" />
      <div>JSON</div>
      <div>{data}</div>
    </>    
  )
}
