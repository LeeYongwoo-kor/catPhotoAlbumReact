# 🐱catPhotoAlbum for React(18.2)

### Original : https://github.com/LeeYongwoo-kor/programmersForFront/tree/main/catPhotoAlbum

---

## **Client** _(Port: 3000)_

### > React (+ Typescript)

- 1. npx create-react-app client --template typescript

## **Server** _(Port: 5000)_

### > Nodejs + Express

- 2. npm install express
- 3. npm init
- 4. npm install nodemon --save-dev
- 5. npm install concurrently

     > ※ <u>Concurrently</u>: <br/>Concurrently is an npm package that allows you to run multiple commands concurrently.  
     > **→ For React + Nodejs Express!**

> Setup config

```js
{
  // pacakage.json
  // ...
  "scripts": {
    "client": "cd client && npm run start",
    "server": "cd server && nodemon server",
    "start": "concurrently \"npm run server\" \"npm run client\""
  },
  // ...
}
```
