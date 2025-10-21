const Order = require('../models/orders');
const Product = require('../models/products');

// @desc    Membuat Pesanan Baru
const create = async (req, res) => {
  const { user, orderItems } = req.body;
  
  try {
    let totalAmount = 0;
    const itemsWithPrice = [];

    // 1. Validasi dan hitung total harga
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ 
          success: false, 
          message: `Produk dengan ID ${item.product} tidak ditemukan.` 
        });
      }

      // Hitung total harga dan simpan harga saat ini (priceAtOrder)
      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;
      
      itemsWithPrice.push({
        product: item.product,
        quantity: item.quantity,
        priceAtOrder: product.price, // Ambil harga real-time dari DB
      });
    }

    // 2. Buat objek Order baru
    const newOrder = new Order({
      user,
      orderItems: itemsWithPrice,
      totalAmount,
    });

    // 3. Simpan ke database
    const order = await newOrder.save();

    res.status(201).json({ 
      success: true, 
      message: 'Pesanan berhasil dibuat.', 
      data: order 
    });
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false, 
        message: err.message 
      });
    }
    res.status(500).json({ 
      success: false, 
      message: 'Kesalahan Server Internal.' 
    });
  }
};

// @desc    Mengambil Semua Pesanan (Dibatasi Admin)
const all = async (req, res) => {
  try {
    // .populate('user', 'username email') hanya mengambil bidang username dan email dari model User
    const orders = await Order.find()
      .populate('user', 'username email') 
      .sort({ orderDate: -1 });

    res.status(200).json({ 
      success: true, 
      count: orders.length, 
      data: orders 
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Gagal mengambil data pesanan.' 
    });
  }
};

// @desc    Mengambil Detail Pesanan
const detail = async (req, res) => {
  try {
    // .populate() bersarang untuk mengambil detail User dan detail Produk dari OrderItems
    const order = await Order.findById(req.params.id)
      .populate('user', 'username email address')
      .populate('orderItems.product', 'name price'); // Ambil nama & harga dari produk

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Pesanan tidak ditemukan.' 
      });
    }

    res.status(200).json({ 
      success: true, 
      data: order 
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Kesalahan Server Internal.' 
    });
  }
};

// @desc    Memperbarui Status Pesanan
const update = async (req, res) => {
  // Hanya izinkan pembaruan status
  const updateFields = {
    status: req.body.status,
  };
  
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Pesanan tidak ditemukan.' 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Status pesanan berhasil diperbarui.', 
      data: order 
    });
  } catch (err) {
    res.status(500).json({ 
      success: false, 
      message: 'Kesalahan Server Internal. : ' + err.message
    });
  }
};

module.exports = {
  create,
  all,
  detail,
  update
};