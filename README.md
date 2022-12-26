# 🐱catPhotoAlbum for React(18.2)

### Original : https://github.com/LeeYongwoo-kor/programmersForFront/tree/main/catPhotoAlbum

---

## **Client** _(Port: 3000)_

### > React (+ Typescript)

- 1. npx create-react-app client --template typescript
- 2. npm install http-proxy-middleware **(in client!)**

> Setup http-proxy-middleware
>
> > proxying all URLs start with /api
> > A simple way to fix invalid options object error when using a proxy to your backend

![image](https://user-images.githubusercontent.com/75498045/209558310-78c60754-7d6e-40f0-86ae-e6f68fb00abb.png)

> Add setupProxy.js file to client

```js
{
  // setupProxy.js
  const { createProxyMiddleware } = require("http-proxy-middleware");

  module.exports = function (app) {
    app.use(
      createProxyMiddleware("/api", {
        target: "http://localhost:5000",
        changeOrigin: true,
      })
    );
  };
}
```

---

## **Server** _(Port: 5000)_

### > Nodejs + Express

- 1. npm install express
- 2. npm init
- 3. npm install nodemon --save-dev
- 4. npm install concurrently

     > ※ <u>Concurrently</u>: <br/>Concurrently is an npm package that allows you to run multiple commands concurrently.  
     > **→ For React + Nodejs Express!**

---

- 5. npm install typescript
- 6. npm npm install ts-node @types/node @types/express --save-dev
- 7. npx tsc --init

> Add option in tsconfig.json :

```js
{
  "compilerOptions": {
    "moduleResolution": "node",
    // ...
    "module": "commonjs",
    "target": "ESNext"
  },
  "exclude": ["node_modules"],
  "include": [
    "./routes/util/*.ts",
  ]
}
```

> Setup config

```js
{
  // pacakage.json
  // ...
  "scripts": {
    "client": "cd client && npm run start",
    "server": "cd server && nodemon --exec ts-node server",
    "start": "concurrently \"npm run server\" \"npm run client\""
  },
  // ...
}
```
