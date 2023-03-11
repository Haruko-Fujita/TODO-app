import ReactDOM from "react-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import "tailwindcss/tailwind.css";
import ListRow from "../components/ListRow";
import ButtonYellow from "../components/ButtonYellow";
import axios from "axios";
const qs = require("qs");

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
  id: Number;
  todo: String;
  type: TypeEnum;
  status: StatusEnum;
}

const ENDPOINT = "http://localhost:5000/todo/";

// todo更新API呼び出し
const putTodo = async (data: IFormInput) => {
  const putParam = qs.stringify({
    content: data.todo,
    typeID: data.type,
    statusID: data.status,
  });
  console.log(ENDPOINT + data.id, putParam);
  axios
    .put(ENDPOINT + data.id, putParam)
    .then((res) => console.log(JSON.stringify(res.data)))
    .catch((error) => console.log(error));
};

export default function FormUpdate() {
  const { register, handleSubmit } = useForm<IFormInput>();

  // 更新ボタンをクリックで、API呼び出し関数に値を渡す
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log();
    putTodo(data);
  };

  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <ListRow>更新id_todo</ListRow>
                  <ListRow>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <ListRow>
                        <input
                          {...register("id", { required: "必須です" })}
                          className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                        />
                      </ListRow>
                      <ListRow>
                        <input
                          {...register("todo", { required: "必須です" })}
                          className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                        />
                      </ListRow>
                      <ListRow>
                        <select
                          {...register("type", {
                            required: "選択してください",
                          })}
                          className="left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none block px-4 py-2 text-sm"
                        >
                          <option value="">Type</option>
                          <option value="1">work</option>
                          <option value="2">community</option>
                          <option value="3">life</option>
                        </select>
                      </ListRow>
                      <ListRow>
                        <select
                          {...register("status", {
                            required: "選択してください",
                          })}
                          className="left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none block px-4 py-2 text-sm"
                        >
                          <option value="">Status</option>
                          <option value="1">new</option>
                          <option value="2">wip</option>
                          <option value="3">completed</option>
                        </select>
                      </ListRow>
                      <ListRow>
                        <ButtonYellow>
                          <input type="submit" />
                        </ButtonYellow>
                      </ListRow>
                    </form>
                  </ListRow>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
