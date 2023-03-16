import { useForm, SubmitHandler } from "react-hook-form";
import "tailwindcss/tailwind.css";
import ListRow from "@/components/ListRow";
import ButtonGreen from "@/components/ButtonGreen";
import Title from "@/components/Title";
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
  todo: String;
  type: TypeEnum;
  status: StatusEnum;
}

// todo追加API呼び出し
const postTodo = async (data: IFormInput) => {
  const postParam = qs.stringify({
    content: data.todo,
    typeID: data.type,
    statusID: data.status,
  });
  axios
    .post(process.env.NEXT_PUBLIC_ENDPOINT, postParam)
    .then((res) => {
      console.log(JSON.stringify(res.data));
    })
    .catch((error) => {
      console.log(error);
      return;
    });
};

export default function FormAdd() {
  const { register, handleSubmit } = useForm<IFormInput>();
  console.log(register, handleSubmit);

  // 送信ボタンをクリックで、API呼び出し関数に値を渡す
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    postTodo(data);
  };

  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                  <ListRow>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <ListRow>
                        <input
                          id="todo"
                          {...register("todo", {
                            required: true,
                            maxLength: 100,
                          })}
                          type="text"
                          placeholder="TODO"
                          className="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        />
                      </ListRow>
                      <ListRow>
                        <select
                          id="type"
                          {...register("type", { required: true })}
                          className="block appearance-none w-full bg-white border text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white"
                        >
                          <option value="0">Type</option>
                          <option value="1">work</option>
                          <option value="2">community</option>
                          <option value="3">life</option>
                        </select>
                      </ListRow>
                      <ListRow>
                        <select
                          id="status"
                          {...register("status", { required: true })}
                          className="block appearance-none w-full bg-white border text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white"
                        >
                          <option value="0">Status</option>
                          <option value="1">new</option>
                          <option value="2">wip</option>
                          <option value="3">completed</option>
                        </select>
                      </ListRow>
                      <ListRow>
                        <ButtonGreen>
                          <input type="submit" value="追加" />
                        </ButtonGreen>
                      </ListRow>
                    </form>
                  </ListRow>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
