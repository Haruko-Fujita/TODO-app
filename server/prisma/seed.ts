const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// モデル投入用のデータ定義
const typeData = [
  {name: "job"},
  {name: "hobby"},
  {name: "health"}
]

const transferTypes = async () => {
  const types = [];
  for (const t of typeData) {
      const type = prisma.type.create({
          data: t,
      })
      types.push(type);
  }
  return await prisma.$transaction(types);
}

const statusData = [
  {name: "new"},
  {name: "in progress"},
  {name: "completed"}
]

const transferStatuses = async () => {
  const statuses = [];
  for (const t of statusData) {
      const status = prisma.status.create({
          data: t,
      })
      statuses.push(status);
  }
  return await prisma.$transaction(statuses);
}

const todoData = [
  {
    content: '銀行振込',
    typeID: 1,
    statusID: 1
  },
  {
    content: 'Buy Christmas gifts',
    typeID: 2,
    statusID: 2
  },
  {
    content: 'muscle training',
    typeID: 3,
    statusID: 3
  }
]

const transferTodos = async () => {
  const todos = [];
  for (const t of todoData) {
      const todo = prisma.todo.create({
          data: t,
      })
      todos.push(todo);
  }
  return await prisma.$transaction(todos);
}

// 定義されたデータを実際のモデルへ登録する処理
const main = async () => {
  console.log(`Start seeding ...`)

  await transferTypes();
  await transferStatuses();
  await transferTodos();

  console.log(`Seeding finished!!!`)
}

// 処理開始
main()
  .catch((e) => {
      console.error(e)
      process.exit(1)
  })
  .finally(async () => {
      await prisma.$disconnect()
  })