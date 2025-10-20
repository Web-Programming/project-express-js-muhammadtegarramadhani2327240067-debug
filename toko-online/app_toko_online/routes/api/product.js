const express = require("express");
const router = express.Router();
const productController = require("../../controllers/product");

function requireJson(req, res, next) {
  // Periksa apakah Content-Type adalah application/json
  if (req.headers['content-type'] !== 'application/json') {
    return res.status(406).json({
      success: false,
      message: 'Header "Content-Type" harus "application/json".'
    });
  }
  next(); // Lanjutkan ke route handler
}
//url create - POST (/api/produk)
router.post("/", requireJson, productController.create);
//url read all - GET (/api/produk)
router.get("/", requireJson, productController.all); //done
//url read one - detail - GET (/api/produk/:id)
router.get("/:id", productController.detailproduk);
//url update - PUT (/api/produk/:id)
router.put("/:id", productController.update);
//url delete - DELETE (/api/produk/:id)
router.delete("/:id", productController.remove);

module.exports = router;