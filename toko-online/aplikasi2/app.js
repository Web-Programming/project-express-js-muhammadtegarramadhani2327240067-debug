// app.js
const express = require("express");
const app = express();
const port = 3000;

// router get
app.get("/", (req, res) => {
  res.send(`hello, get request!`);
});

app.use(express.json());

app.post("/sumbit", (req, res) => {
  const {name, npm, jeniskelamin} = req.body;
  res.send(`hello, ${name} dengan NPM ${npm}. Apakah kamu ${jeniskelamin}?`);
});

app.listen(port, (req, res) => {
  console.log(`Server running at http://localhost:${port}/`);
});

app.use(express.static("public"));

app.listen(port, (req, res) => {
  console.log(`Server running at http://localhost:${port}/`);
});
