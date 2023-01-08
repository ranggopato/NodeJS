1. How to use middleware in express js

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

2. How to parsing incoming request in express

using body parser check this website 'http://expressjs.com/en/resources/middleware/body-parser.html'

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
now you can access req.body

const express = require("express");

const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", (req, res, next) => {
console.log("always run");
next();
});
app.use("/add-product", (req, res, next) => {
console.log("another middleware");
res.send(
"<form action='/product' method='POST'><input type='text' name='title'><button type='submit'>Add Product</button></form>"
);
});

app.post("/product", (req, res, next) => {
console.log(req.body);
res.redirect("/");
});
app.get("/", (req, res, next) => {
console.log("another middleware");
res.send("<h1>Hello from Express</h1>");
});

app.listen(3000);
