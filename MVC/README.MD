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
