// ../controllers/order.js
const Order = require('../models/orders');
const mongoose = require('mongoose');

// CREATE Order — hitung totalAmount sebelum simpan
exports.createOrder = async (req, res) => {
  try {
    const { user, orderItems, status } = req.body;

    if (!user || !orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({ message: 'user dan orderItems (minimal 1) wajib diisi' });
    }

    // hitung totalAmount = sum(quantity * priceAtOrder)
    const totalAmount = orderItems.reduce((sum, item) => {
      const qty = Number(item.quantity) || 0;
      const price = Number(item.priceAtOrder) || 0;
      return sum + (qty * price);
    }, 0);

    const order = new Order({
      user,
      orderItems,
      totalAmount,
      status
    });

    const saved = await order.save();
    // populate user (basic)
    await saved.populate('user', 'username email address isAdmin').execPopulate();

    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') return res.status(400).json({ message: err.message });
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};

// GET all orders (populate user)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'username email address isAdmin');
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};

// GET one order by id (populate user and orderItems.product)
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'ID order tidak valid' });

    const order = await Order.findById(id)
      .populate('user', 'username email address isAdmin')
      .populate('orderItems.product');
    if (!order) return res.status(404).json({ message: 'Order tidak ditemukan' });
    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};

// UPDATE status saja
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: 'status wajib diisi' });
    // validasi enum handled by mongoose if use findByIdAndUpdate with runValidators
    const updated = await Order.findByIdAndUpdate(id, { status }, { new: true, runValidators: true })
      .populate('user', 'username email address isAdmin')
      .populate('orderItems.product');
    if (!updated) return res.status(404).json({ message: 'Order tidak ditemukan' });
    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') return res.status(400).json({ message: err.message });
    res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
};