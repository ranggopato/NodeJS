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
