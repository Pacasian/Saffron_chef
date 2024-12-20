const mongoose = require('mongoose');

// Define the schema for Seller Orders
const sellerOrderSchema = new mongoose.Schema({
    // orderID: {
    //     type: String,
    //     required: true,
    //     unique: true,
    // },
    cxID: {
        type: String,
        required: true,
    },
    delivyID: {
        type: String,
        required: true,
    },
    itemIDs: {
        type: [String], // Array of item IDs
        required: true,
    },
    itemCnt: {
        type: [Number],
        required: true,
        min: 1,
    },
    DAT: {
        type: Date,
        default: Date.now,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    offer: {
        type: Number, // Representing percentage or flat discount
        default: 0,
        min: 0,
    },
    addr: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        match: /^\d{10}$/, // Assuming a 10-digit phone number format
    },
    note: {
        type: String,
        default: '',
    },
    status: {
        type: String,
        enum: ['processing', 'cooking', 'on way', 'delivered', 'cancelled'],
        default: 'processing',
    },
});

// Create the model
const SellerOrder = mongoose.model('SellerOrder', sellerOrderSchema);

module.exports = SellerOrder;