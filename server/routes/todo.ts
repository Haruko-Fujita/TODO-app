import express from 'express';
import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// 全todoデータの取得
router.get('/', async function(req: Request, res: Response) {
  const allTodo = await prisma.todo.findMany(); //array
  res.status(200).json(allTodo);
});
  
// データの更新
router.put('/:id', async function(req: Request, res: Response) {
  const { content, typeID, statusID } = req.body;
  const updateTodo = await prisma.todo.update({
    where: { id: parseInt(req.params.id) },
    data: { content: content, typeID: parseInt(typeID), statusID: parseInt(statusID) },
  })
  res.json(updateTodo);
});

// データの追加
router.post('/', async function(req: Request, res: Response) {
  const { content, typeID, statusID } = req.body;
  const addTodo = await prisma.todo.create({
    data: { content, typeID: parseInt(typeID), statusID: parseInt(statusID) }
  })
  res.json(addTodo);
});

// データの削除
router.delete('/:id', async function(req: Request, res: Response) {
  const deleteTodo = await prisma.todo.delete({
    where: { id: parseInt(req.params.id) }
  })
  res.json(deleteTodo);
});

module.exports = router;
