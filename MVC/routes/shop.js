const path = require("path");

const express = require("express");

const controller = require("../controllers/product");

const router = express.Router();

router.get("/", controller.getProduct);

module.exports = router;
