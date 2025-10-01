var express = require("express");
var router = express.Router();
var products = require("../../data/products.json");

router.get("/:id", function(req, res, next){
    const productId = parseInt(req.params.id); //Tangkap ID dari URL
    const product = products.find(p => p.id === productId); //Cari produk by id

    if(!product){ //jika produk tidak ditemukan
        return res.status(404).send('Produk tidak ditemukan!');
    }
    res.render('product-detail',
        {
            title : product.name,
            product : product
        }
    );
});
module.exports = router;