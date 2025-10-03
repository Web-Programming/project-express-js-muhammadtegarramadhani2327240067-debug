// app.js
const express = require("express");
const app = express();
const port = 3000;
// serving static file do folder public
app.use(express.static("public"));

app.listen(port, (req, res) => {
  console.log(`Server running at http://localhost:${port}`);
});
