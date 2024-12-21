const express = require("express");
const router = express.Router();
const customerData = require("../models/customerModel");
const sellerUserData = require("../models/sellerUserModel");


router.get("/", async (req, res) => {

});

router.post("/", async (req, res) => {
    const sellerUserDataList = new customerData({
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
    customerData.save().then((create)=>{
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


module.exports = router;