const mongoose = require("mongoose");

//buat skema produk 
const ProductSchema = new mongoose.Schema({
    //tdk perlu membuat properti id krna akan dibuat otomatis 
    // dengan nama_id

    name: {
        type : String,
        required: [true, "Nama Produk harus di isi"],
        true : true,
    },
    price : {
        type : Number,
        required : [true, "Harga Produk harus di isi"],
        min: [1000, "Harga Produk minimal 1000"], //nilai minimum 
    },
    description: {
        type: String,
        required: false,
    },
    stok: {
        type: Number,
        default: 0,
    },
    createks: {
        type: DataTransfer,
        default: DataTransfer.now
    }
});