import express from "express";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// 全todoデータの取得
router.get("/", async function (req: Request, res: Response) {
  const getAllTodo = await prisma.todo.findMany(); //array
  res.status(200).json(getAllTodo);
});

// 指定のtodoデータの取得
router.get("/:id", async function (req: Request, res: Response) {
  const getTodo = await prisma.todo.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.status(200).json(getTodo);
});

// データの更新
router.put("/:id", async function (req: Request, res: Response) {
  const { content, typeID, statusID } = req.body;
  const updateTodo = await prisma.todo.update({
    where: { id: parseInt(req.params.id) },
    data: {
      content: content,
      typeID: parseInt(typeID),
      statusID: parseInt(statusID),
    },
  });
  res.json(updateTodo);
});

// データの追加
router.post("/", async function (req: Request, res: Response) {
  const { content, typeID, statusID } = req.body;
  const addTodo = await prisma.todo.create({
    data: { content, typeID: parseInt(typeID), statusID: parseInt(statusID) },
  });
  res.json(addTodo);
});

// データの削除
router.delete("/:id", async function (req: Request, res: Response) {
  const deleteTodo = await prisma.todo.delete({
    where: { id: parseInt(req.params.id) },
  });
  res.json(deleteTodo);
});

// Typeの取得
router.get("/", async function (req: Request, res: Response) {
  const getType = await prisma.type.findMany(); //array
  res.status(200).json(getType);
});

// Statusの取得
router.get("/", async function (req: Request, res: Response) {
  const getStatus = await prisma.status.findMany(); //array
  res.status(200).json(getStatus);
});

module.exports = router;
