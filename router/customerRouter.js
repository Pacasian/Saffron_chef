const express = require("express");
const router = express.Router();
const customerData = require("../models/customerModel");
const dishModel = require("../models/dishModel");


router.get("/", async (req, res) => {

});

router.post("/", async (req, res) => {
    const customerDataList = new customerData({
        dName:req.body.dName,
        dUser:req.body.dUser,
        dPassword:req.body.dPassword,
        image:req.body.image,
        dtJoin: req.body.dtJoin,
        dEmail:req.body.dEmail,
        dPhone:req.body.dPhone,
        firebaseID:req.body.firebaseID,
        address:req.body.address,
        addSec:req.body.addSec,
        dob:req.body.dob,
    });
    customerDataList.save().then((create)=>{
        console.log("created a new user");
        res.status(200).json(create);
    }).catch((error)=>{
        res.status(500).json({
            error:error,
            success:false,
        });
        console.error("Failed 2",error.message)
    });
    console.log("New user added")

});

router.get("/login", async (req, res) => {
    const { firebaseID } = req.query;  // Assuming query parameters for GET request

    if (!firebaseID) {
        return res.status(400).json({
            success: false,
            message: "dUser and dPassword are required."
        });
    }

    try {
        // Find user by dUser (username)
        const customerDataList    = await customerData.findOne({ firebaseID });

        if (!customerDataList) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // // Check if the password matches
        // if (customerDataList.dPassword !== dPassword) {
        //     return res.status(401).json({
        //         success: false,
        //         message: "Incorrect password"
        //     });
        // }

        // If user found and password matches
        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: customerDataList
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while processing your request.",
            error: error.message
        });
    }
});

// PUT route to update a customer by its firebaseID
router.put('/update/:firebaseID', async (req, res) => {
    try {
        const firebaseID = req.params.firebaseID; // Extract firebaseID from request parameters
        const updateData = req.body; // Data to update

        // Find the document by firebaseID and update it
        const updatedCustomer = await customerData.findOneAndUpdate(
            { firebaseID },    // Query to find the document by firebaseID
            updateData,        // Data to update
            { new: true, runValidators: true } // Return the updated document and validate the update
        );

        // If the document is not found
        if (!updatedCustomer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        // Respond with the updated document
        res.status(200).json({
            message: "Customer updated successfully",
            data: updatedCustomer,
        });
    } catch (error) {
        // Handle errors and respond with an error message
        res.status(500).json({
            message: "Failed to update customer",
            error: error.message,
        });
    }
});



module.exports = router;