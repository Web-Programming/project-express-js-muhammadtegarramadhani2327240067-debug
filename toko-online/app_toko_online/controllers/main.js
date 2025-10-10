var products = require('../../data/products.json');

const index = (req, res) => {
 	res.render('index', {
        title: 'Toko Online Sederhana',
        products: products
    });
}; 

module.exports = { index }; 