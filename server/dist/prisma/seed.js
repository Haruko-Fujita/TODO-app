"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// モデル投入用のデータ定義
const typeData = [
    { name: "job" },
    { name: "hobby" },
    { name: "health" }
];
const transferTypes = () => __awaiter(void 0, void 0, void 0, function* () {
    const types = [];
    for (const t of typeData) {
        const type = prisma.type.create({
            data: t,
        });
        types.push(type);
    }
    return yield prisma.$transaction(types);
});
const statusData = [
    { name: "new" },
    { name: "in progress" },
    { name: "completed" }
];
const transferStatuses = () => __awaiter(void 0, void 0, void 0, function* () {
    const statuses = [];
    for (const t of statusData) {
        const status = prisma.status.create({
            data: t,
        });
        statuses.push(status);
    }
    return yield prisma.$transaction(statuses);
});
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
];
const transferTodos = () => __awaiter(void 0, void 0, void 0, function* () {
    const todos = [];
    for (const t of todoData) {
        const todo = prisma.todo.create({
            data: t,
        });
        todos.push(todo);
    }
    return yield prisma.$transaction(todos);
});
// 定義されたデータを実際のモデルへ登録する処理
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Start seeding ...`);
    yield transferTypes();
    yield transferStatuses();
    yield transferTodos();
    console.log(`Seeding finished!!!`);
});
// 処理開始
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
