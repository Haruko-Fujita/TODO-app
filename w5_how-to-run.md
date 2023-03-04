# client 環境をローカルに生成、起動OK  
  
```npx create-next-app@latest client --typescript```  
clientディレクトリ生成、配下にNext.js(TS)セット  
  
```cd client```  
```npm run dev```  
http://localhost:3000 表示OK  
  
  
  
# server 環境をローカルに生成、起動しない  
  
```npm install express-generator -g```  
  
```bash```  
```# express --view=pug server```  
server ディレクトリの中にpackege.json他が生成される(node_moduleはない)  
  
```# cd server```  
```server# npm install nodemon```  
node_moduleディレクトリが生成される  
  
```server# npm install router```  
```server# npm install```  
  
package.jsonに追記  
```  
  "scripts": {
    "start": "node ./bin/www",
    "start:debug": "nodemon -L --inspect=0.0.0.0:9229 ./bin/www"　// <=追記
  },
```  
  
```server# npm start```  
エラー```Port 3000 is already in use```  
