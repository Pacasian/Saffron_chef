const express = require('express');
const router = express.Router();
const SellerOrder = require('../models/orderModel');
const dishModel = require("../models/dishModel"); // Adjust path as needed



// Get All order
router.get('/',async (req,res)=>{

    try {
        const allOrder = await SellerOrder.find();

        res.status(200).json(allOrder);

    } catch (error) {


        res.status(500).json({
            success:false,
            error:error.message,
        })
    }
});


// --- 1. Insert a New Order ---
router.post('/orders', async (req, res) => {
    try {
        const {
            cxID,
            delivyID,
            itemIDs,
            itemCnt,
            price,
            offer,
            addr,
            phone,
            note,
            status,
        } = req.body;

        // Create a new order instance
        const newOrder = new SellerOrder({
            cxID,
            delivyID,
            itemIDs,
            itemCnt,
            price,
            offer,
            addr,
            phone,
            note,
            status,
        });

        // Save the order to the database
        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully!', newOrder });
    } catch (error) {
        res.status(400).json({ message: 'Error creating order', error: error.message });
    }
});

// --- 2. View an Order by ID ---
router.get('/orders/:id', async (req, res) => {
    try {
        const order = await SellerOrder.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching order', error: error.message });
    }
});

// --- 3. Update an Order by ID ---
router.put('/orders/:id', async (req, res) => {
    try {
        const updatedOrder = await SellerOrder.findByIdAndUpdate(req.params.id, req.body, {
            new: true,           // Return the updated document
            runValidators: true, // Ensure schema validations are applied
        });

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order updated successfully!', updatedOrder });
    } catch (error) {
        res.status(400).json({ message: 'Error updating order', error: error.message });
    }
});
// --- 4. Get All Orders by Customer ID (New Feature) ---
router.get('/orders/customer/:cxID', async (req, res) => {
    try {
        const { cxID } = req.params;
        const orders = await SellerOrder.find({ cxID });

        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this customer' });
        }

        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching orders by customer ID', error: error.message });
    }
});

// --- 5. Get All Orders by Date (New Feature) ---
router.get('/orders/date/:date', async (req, res) => {
    try {
        // Extract date from the request params and convert it to a Date object
        const { date } = req.params;
        const targetDate = new Date(date);

        // Set the start and end of the day to find all orders within that day
        const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

        // Query orders within the specified date range
        const orders = await SellerOrder.find({
            DAT: { $gte: startOfDay, $lte: endOfDay },
        });

        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this date' });
        }

        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching orders by date', error: error.message });
    }
});

module.exports = router;
