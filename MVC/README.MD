This is a Document to learn MVC in node js Created by Ranggo Pato

# What is MVC

### Models

1. represent your data in your code
2. work with your data (e.g save fetch)

### Views

1. what users sees
2. decoupled from your application code

### Controllers - ( routes - controller)

1. connecting your models and your views

# Adding controller

first we make our controllers folder and then we seperate our route function to controller js that we make.

here is our controller code
//controller/product.js

        const products = [];
        exports.getAddProduct = (req, res, next) => {
        res.render("add-product", {
            pageTitle: "Add Product",
            path: "/admin/add-product",
            formsCSS: true,
            productCSS: true,
            activeAddProduct: true,
        });
        };

        exports.postAddProduct = (req, res, next) => {
        products.push({ title: req.body.title });
        res.redirect("/");
        };

        exports.getProduct = (req, res, next) => {
        res.render("shop", {
            prods: products,
            pageTitle: "Shop",
            path: "/",
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true,
        });
        };

here is our routes code after using the controller
//routes/admin.js

        const path = require("path");

        const express = require("express");

        const rootDir = require("../util/path");

        const router = express.Router();

        const controller = require("../controllers/product");

        // /admin/add-product => GET
        router.get("/add-product", controller.getAddProduct);

        // /admin/add-product => POST
        router.post("/add-product", controller.postAddProduct);

        module.exports = router;

# Adding Model

first we make our model folder and the file, we can name it with name that represents our data, so i will name it product.js. to store our file right now we use data folder, in that folder we store it in product.json

in our models we could write

//models/product.js

        const fs = require("fs");
        const path = require("path");
        const p = path.join(__dirname, "../", "data", "products.json");

        const getProduct = (cb) => {
        fs.readFile(p, (err, data) => {
            if (err) {
            cb([]);
            } else {
            cb(JSON.parse(data));
            }
        });
        };

        module.exports = class Product {
        constructor(t) {
            this.title = t;
        }

        save() {
            getProduct((products) => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
            });
        }
        static fetchAll(cb) {
            getProduct(cb);
        }
        };

so right now we have our models that store our data to the package.json, after that we should edit our controller again

//controllers/product.js

        const Product = require("../models/product");
        exports.getAddProduct = (req, res, next) => {
        res.render("add-product", {
            pageTitle: "Add Product",
            path: "/admin/add-product",
            formsCSS: true,
            productCSS: true,
            activeAddProduct: true,
        });
        };

        exports.postAddProduct = (req, res, next) => {
        const product = new Product(req.body.title);
        product.save();
        res.redirect("/");
        };

        exports.getProduct = (req, res, next) => {
        Product.fetchAll((products) => {
            res.render("shop", {
            prods: products,
            pageTitle: "Shop",
            path: "/",
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true,
            });
        });
        };

in exports.getProduct i use callback function because we use it in fetchAll in the models/product
