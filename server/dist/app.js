"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import logger from 'morgan';
const body_parser_1 = __importDefault(require("body-parser")); //post用
const cors_1 = __importDefault(require("cors"));
const pino_1 = __importDefault(require("pino"));
const express_pino_logger_1 = __importDefault(require("express-pino-logger"));
const indexRouter = require("./routes/index");
const todoRouter = require("./routes/todo");
const app = (0, express_1.default)();
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
// app.use(logger('dev')); // morgan
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use(body_parser_1.default.urlencoded({ extended: true })); //post用
app.use(body_parser_1.default.json()); //post用
const options = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200, //レスポンスstatusを200に設定
};
app.use((0, cors_1.default)(options));
app.use(express_1.default.json());
app.use("/", indexRouter);
app.use("/todo", todoRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// 指定ポートでWEBサーバーを起動する
const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`listening on ${PORT}`);
// });

// ロガーpino
const logger = (0, pino_1.default)({ level: process.env.LOG_LEVEL || "info" }); // pinoのloggerインスタンスを作成
const expressLogger = (0, express_pino_logger_1.default)({ logger }); // express-pino-loggerに渡す
// 新しいロガーミドルウェアを作成
app.use(expressLogger);
// logger.debugをルートパスに追加し、それぞれ異なるログレベルを表示
app.get("/", (req, res) => {
  logger.debug("Calling res.send");
  res.send("Hello World");
});
// サーバーを開始する際に呼び出していたconsole.logをlogger.infoに置き換え、
app.listen(PORT, () => {
  logger.info("Server running on PORT %d", PORT);
});
module.exports = app;
