1.  How to use middleware in express js

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

2.  How to parsing incoming request in express

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

3. routing in express

routing in express using express.Router

example
const express = require("express");

    const router = express.Router();

    router.get("/add-product", (req, res, next) => {
    console.log("another middleware");
    res.send(
    "<form action='/product' method='POST'><input type='text' name='title'><button type='submit'>Add Product</button></form>"
    );
    });

    router.post("/product", (req, res, next) => {
    console.log(req.body);
    res.redirect("/");
    });

    module.exports = router;

in our app.js we should import routes and use in with express :

    const express = require("express");
    const adminRoutes = require("./routes/admin");
    const shopRoutes = require("./routes/shop");

    const app = express();
    const bodyParser = require("body-parser");

    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(adminRoutes);

    app.use(shopRoutes);

    app.use("/", (req, res, next) => {
    console.log("always run");
    next();
    });

    app.listen(3000);

3. adding 404 page by using middleware we can take advantage of the middleware, so we can put app.use in the last of our code example :

   const express = require("express");
   const adminRoutes = require("./routes/admin");
   const shopRoutes = require("./routes/shop");

   const app = express();
   const bodyParser = require("body-parser");

   app.use(bodyParser.urlencoded({ extended: false }));

   app.use(adminRoutes);

   app.use(shopRoutes);

   app.use((req, res, next) => {
   res.status(404).send("<h1>Page not found</h1>");
   });

   app.listen(3000);
