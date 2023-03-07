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
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
// 全todoデータの取得
router.get('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const allTodo = yield prisma.todo.findMany(); //array
        res.status(200).json(allTodo);
    });
});
// データの更新
router.put('/:id', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { content, typeID, statusID } = req.body;
        const updateTodo = yield prisma.todo.update({
            where: { id: parseInt(req.params.id) },
            data: { content: content, typeID: parseInt(typeID), statusID: parseInt(statusID) },
        });
        res.json(updateTodo);
    });
});
// データの追加
router.post('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { content, typeID, statusID } = req.body;
        const addTodo = yield prisma.todo.create({
            data: { content, typeID: parseInt(typeID), statusID: parseInt(statusID) }
        });
        res.json(addTodo);
    });
});
// データの削除
router.delete('/:id', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const deleteTodo = yield prisma.todo.delete({
            where: { id: parseInt(req.params.id) }
        });
        res.json(deleteTodo);
    });
});
module.exports = router;
