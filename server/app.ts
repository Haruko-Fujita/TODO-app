import createError from 'http-errors';
import express from 'express';
import { Request, Response, NextFunction } from "express";
import path from 'path';
import cookieParser from 'cookie-parser';
// import logger from 'morgan';
import bodyParser from 'body-parser';//post用
import cors from 'cors';
import pino from 'pino';
import expressPino from 'express-pino-logger';

const indexRouter = require('./routes/index');
const todoRouter = require('./routes/todo');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(logger('dev')); // morgan
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));//post用
app.use(bodyParser.json());//post用
const options: cors.CorsOptions = {
  origin: 'http://localhost:3000', //アクセス許可するオリジン
  credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
  optionsSuccessStatus: 200 //レスポンスstatusを200に設定
};
app.use(cors(options));
app.use(express.json());

app.use('/', indexRouter);
app.use('/todo', todoRouter);

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 指定ポートでWEBサーバーを起動する
const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`listening on ${PORT}`);
// });

// ロガーpino
const logger = pino({ level: process.env.LOG_LEVEL || 'info' }); // pinoのloggerインスタンスを作成
const expressLogger = expressPino({ logger }); // express-pino-loggerに渡す

// 新しいロガーミドルウェアを作成
app.use(expressLogger);

// logger.debugをルートパスに追加し、それぞれ異なるログレベルを表示
app.get('/', (req, res) => {
  logger.debug('Calling res.send');
  res.send('Hello World');
});

// サーバーを開始する際に呼び出していたconsole.logをlogger.infoに置き換え、
app.listen(PORT, () => {
  logger.info('Server running on PORT %d', PORT);
});

module.exports = app;
