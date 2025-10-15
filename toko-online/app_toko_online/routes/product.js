var express = require("express");
var router = express.Router();
var productController = require("../controllers/product");

router.get("/apiall", productController.all);
router.get("/all", productController.index);
router.get("/:id", productController.detail);


module.exports = router;