// ../models/orders.js
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Produk wajib diisi']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity wajib diisi'],
    min: [1, 'Quantity minimal 1']
  },
  priceAtOrder: {
    type: Number,
    required: [true, 'Harga saat order wajib diisi'],
    min: [0, 'Harga tidak boleh negatif']
  }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User (pemesan) wajib diisi']
  },
  orderItems: {
    type: [orderItemSchema],
    required: [true, 'orderItems wajib diisi'],
    validate: {
      validator: arr => Array.isArray(arr) && arr.length > 0,
      message: 'orderItems harus memiliki minimal 1 item'
    }
  },
  totalAmount: {
    type: Number,
    required: [true, 'totalAmount wajib diisi'],
    min: [0, 'totalAmount tidak boleh negatif']
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped','Delivered', 'Cancelled'],
    default: 'Pending'
  },
  orderDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);