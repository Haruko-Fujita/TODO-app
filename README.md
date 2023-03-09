# TODO アプリ
<!-- "hoge"が何かを簡潔に紹介する -->

<!-- DEMO
"hoge"の魅力が直感的に伝わる画像を張る -->

<!-- Features
"hoge"のセールスポイントや差別化などを説明する -->

## 機能

- TODO 一覧取得
- TODO 追加
- TODO 更新（修正中）
- TODO 削除

## 使用技術

- JavaScript: ES2016
- TypeScript: 4.9.4
- Next.js: 13.0.6
- Express: 4.16.1
- Prisma: 4.8.0
- MySQL: 8.0.31
- Tailwind CSS: 3.2.7

## システム構成

![image](https://user-images.githubusercontent.com/94355319/224037042-cc9fc675-a914-44ac-880b-2b5c3c4bc4a2.png)

<!-- Usage
DEMO の実行方法など、"hoge"の基本的な使い方を説明する -->

## 使い方

1. リポジトリのクローン  
   `git clone https://github.com/Haruko-Fujita/TODO-app.git`

2. server 起動  
   `cd server` `npm install`  
   package.json を下記の通り修正

```
  "scripts": {
    "start:debug": "nodemon -L --inspect=0.0.0.0:9229 ./bin/www",
    "dev": "ts-node-dev --respawn routes/index.ts",
    "clean": "rimraf dist",
    "tsc": "tsc",
    "build": "npm-run-all clean tsc"
  },
```

`npm run dev`

3. MySQL 起動

4. Prisma 環境構築  
   `cd server` `npx prisma` Prisma CLI を起動  
   `npx prisma migrate dev --name init` DB にスキーマとテーブル作成  
   `npx ts-node prisma/seed.ts` seed が DB に追加される

5. client 起動  
   `cd client` `npm install` `npm run dev`  
   `http://localhost:3000/todo` アプリにアクセスする
