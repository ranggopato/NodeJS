const http = require("http");

const express = require("express");

const app = express();

app.use((req, res, next) => {
  res.send("<div>test</div>");
  console.log("in the middleware");
  next();
});
app.use((req, res, next) => {
  console.log("another middleware");
});

app.listen(3000);
