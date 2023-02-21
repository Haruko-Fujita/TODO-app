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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// 全todoデータの取得
router.get('/', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const allTodo = yield prisma.todo.findMany(); //array
        res.status(200).json(allTodo);
    });
});
// データの追加
// router.post('/', async function(req: Request, res: Response, next: NextFunction) {
//   console.log(req.body);
//   res.json(req.body.todo);
//   const addTodo = await prisma.todo.create({
//     // where: { id: 4 },
//     create: { content: "buy a birthday present", typeID:2, statusID:3 }
//   })  
//   res.status(200).json(addTodo);
// });
// router.post('/', async function(req: Request, res: Response, next: NextFunction) {
//   const addTodo = await prisma.todo.upsert({
//     where: { id: 4 },
//     update: { content: "buy a Christmas gift", typeID:2, statusID:2 },
//     create: { content: "buy a Christmas gift", typeID:2, statusID:3 }
//   })  
//   res.status(200).json(addTodo);
// });
// データの更新
router.put('/', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const updateTodo = yield prisma.todo.update({
            where: { id: 4 },
            data: { content: "大掃除" },
        });
        res.status(200).json(updateTodo);
    });
});
// データの削除
// router.put('/', async function(req: Request, res: Response, next: NextFunction) {
//   const deleteTodo = await prisma.todo.delete({
//     where: { id: 4 }
//   })
//   res.status(200).json(deleteTodo);
// });
module.exports = router;
