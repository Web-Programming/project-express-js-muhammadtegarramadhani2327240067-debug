// ../routes/api/order.js
const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/order');

// For simplicity: no auth middleware here. In production protect routes.
router.post('/', orderController.createOrder);       // create (hitung total di controller)
router.get('/', orderController.getAllOrders);       // get all (populate user)
router.get('/:id', orderController.getOrderById);    // get one (populate user & product)
router.put('/:id', orderController.updateOrderStatus); // update status only

module.exports = router;