var express = require("express");
var router = express.Router();
var Product = require("../models/product");

// Route untuk menampilkan semua produk
router.get("/all", async function (req, res, next) {
  try {
    const products = await Product.find({});
    res.render("index", {
      title: "Toko Online Sederhana",
      product: products,
    });
  } catch (err) {
    res.status(500).send("Gagal memuat produk");
  }
});

// Route untuk menampilkan detail produk berdasarkan ID
router.get("/:id", async function (req, res, next) {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send("Produk tidak ditemukan!");
    }

    res.render("product-detail", {
      title: product.nama,
      product: product,
    });
  } catch (err) {
    res.status(500).send("Gagal memuat detail produk");
  }
});

module.exports = router;