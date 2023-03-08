import ReactDOM from "react-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import "tailwindcss/tailwind.css";

enum TypeEnum {
  work = "work",
  community = "community",
  life = "life",
}

enum StatusEnum {
  new = "new",
  wip = "wip",
  completed = "completed",
}

interface IFormInput {
  todo: String;
  type: TypeEnum;
  status: StatusEnum;
}

export default function App() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>TODO</label>
      <input
        {...register("todo", { required: "必須です" })}
        className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
      />
      <label>Type</label>
      <select
        {...register("type", { required: "選択してください" })}
        className="left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none block px-4 py-2 text-sm"
      >
        <option value="">Type</option>
        <option value="work">work</option>
        <option value="community">community</option>
        <option value="life">life</option>
      </select>
      {/* <label>Status</label>
      <select {...register("status"), {required: '選択してください'}} >
        <option value="new">new</option>
        <option value="wip">wip</option>
        <option value="completed">completed</option>
      </select> */}
      <input type="submit" />
    </form>
  );
}
