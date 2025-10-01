var express = require('express');
var router = express.Router();
var mainController = require("../controllers/main");

/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', {
//     title: 'Toko Online Sederhana',
//     products: products
//   });
// });
router.get("/", mainController.index);

//selesaikan fungsi route pencarian, pisahkan dengan controller

module.exports = router;
