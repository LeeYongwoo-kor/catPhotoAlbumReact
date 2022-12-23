const express = require("express");
const app = express();
const router = express.Router();

app.use(express.json()); // use read json
app.use(express.urlencoded({ extended: true })); // use qs module

router.get("/", function (req, res, next) {
  res.send("Hello, world!");
});

module.exports = router;
