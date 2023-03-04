# 構成  
https://www.canva.com/design/DAFUnfcQiZE/GD3Q-W9BGU4fdjJHJzPOqg/view?utm_content=DAFUnfcQiZE&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink  
  
## 残タスク
- NextでのAPI呼び出しにidパラメータ渡したい（削除、更新）indexとidがずれるため、API設計変更
- 追加、削除後にリロードしないとtodoが更新されない
- Express APIエラー時にサーバ停止を回避したい（PM2を実装）
## day7
- NextでのAPI呼び出しにidパラメータ渡す（削除）
- ログ追加（pino-Express/winston-Next）
## day6
- Express APIエラー時にサーバ停止を回避したい（調査のみ：PM2を使う）
- NextでのAPI呼び出しにパラメータ追加（追加ok、削除と更新はid以外ok）
## day5
- Next画面からのAPI呼び出しにパラメータ追加（削除）
- corsエラー対策
## day4
- ExpressでAPI作成(PUT/POST/DELETE)
- Next画面からのAPI呼び出し（追加/更新/削除）、画面作成
## day3
- Express起動
- ExpressにTypeScriptインストール
- PrismaでDB作成  
- ExpressでAPI作成(GET)、Nextでの表示確認
- TypeScript
## day2  
- Next.js/clientで画面仮作成  
- 構成図作成  
- Express/serverでAPI作成  
- MySQL起動
## day1  
- ローカルで環境構築（手順以下、Next.js起動、Expressはポート変更中）  
- dockerコンテナ化できず  
- clientで画面作成中  
  
  
### client 環境をローカルに生成、起動OK  
```npx create-next-app@9 client --typescript```  
clientディレクトリ生成、配下にNext.js(TS)セット  
  
```cd client```  
```npm install axios```  
```npm i --save-dev @types/qs```  
```npm i winston```  
```npm i -D @types/winston```

```npm run dev```  
http://localhost:3000 表示ok  
  
  
  
### Express 環境をローカルに生成、起動ok   
```npm install express-generator -g```TypeScript/EsLintを選択  
```bash```  
```express --view=pug server```  
server ディレクトリの中にpackege.json他が生成される(node_moduleはない)  
  
```cd server```  
```npm install```  
node_moduleディレクトリが生成される  
  
```npm install nodemon```  
```npm install router```  
```npm install -D typescript @types/express @types/cookie-parser @types/morgan @types/http-errors```  
```npm install ts-node-dev```プログラムの修正がリアルタイムで反映するため  
```npm install rimraf```ビルド（TypeScriptからJavaScriptへの変換）先のディレクトリをクリアするため  
```npm install npm-run-all```npmスクリプトを複数実行するため  
```npm install cors```  
```npm install --save-dev @types/cors```  
```npm install pino express-pino-logger```  
  
package.jsonに追記  
```  
  "scripts": {
    // "start": "node ./bin/www", <-- 削除する
    "start:debug": "nodemon -L --inspect=0.0.0.0:9229 ./bin/www",  
    "dev": "ts-node-dev --respawn routes/index.ts", // プログラムの修正をリアルタイムで反映（TS→JS、サーバ起動）  
    "clean": "rimraf dist",  
    "tsc": "tsc", // コンパイルされ、jsファイルに変換  
    "build": "npm-run-all clean tsc"  
  },
```  
  
```npm run dev```  
http://localhost:5000/ Express表示ok  
  
  
  
### serverディレクトリでPrisma環境構築 
https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project  
  
  
  
### MySQL起動
```"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqld"```  
起動確認  
```mysqladmin ping -u root -p```  
```mysqld is alive```表示確認  
  
起動できない場合：ctrl + r, services.msc, mySQL80,サービス開始  
  