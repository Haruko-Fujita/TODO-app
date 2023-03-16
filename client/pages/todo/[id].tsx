// import { useRouter } from "next/router";
// import Layout from "@/components/Layout";
// import axios from "axios";
// import { useEffect, useState } from "react";

// export default function EditTodo() {
//   const [data, setData] = useState(null);
//   const [isLoading, setLoading] = useState(false);
//   const router = useRouter();
//   const id = router.query.id;

//   useEffect(() => {
//     setLoading(true);
//     fetch(process.env.ENDPOINT + id)
//       .then((res) => res.json())
//       .then((data) => {
//         setData(data);
//         setLoading(false);
//       });
//     console.log("data");
//     console.log(data);
//   }, []);

//   if (isLoading) return <p>Loading...</p>;
//   if (!data) return <p>No profile data</p>;

//   return (
//     <div>
//       <h1>{data}</h1>
//     </div>
//   );
// }
