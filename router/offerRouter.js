const express = require('express');
const router = express.Router();
const offerController = require('../models/offerModel');
const mongoose = require('mongoose');


// Get All Offer
router.get('/',async (req,res)=>{

    try {
        const allOffer = await offerController.find();

        res.status(200).json(allOffer);

    } catch (error) {


        res.status(500).json({
            success:false,
            error:error.message,
        })
    }
});

// Get All Offers where 'doe' is today or in the future
router.get('/curOffer', async (req, res) => {
    try {
        const currentDate = new Date();
        const allOffer = await offerController.find({
            doe: { $gte: currentDate }
        });

        res.status(200).json(allOffer);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});


// Get All Offers where 'doe' is today or in the future and exclude certain '_ids'
router.get('/activeOfferByCx', async (req, res) => {
    try {
        const currentDate = new Date();
        const excludeIds = req.query.excludeIds ? req.query.excludeIds.split(',').map(id => id.trim()) : [];

        // Convert the string _ids to ObjectId
        const objectIds = excludeIds.map(id => new mongoose.Types.ObjectId(id));

        const allOffer = await offerController.find({
            doe: { $gte: currentDate },
            _id: { $nin: objectIds }
        });

        res.status(200).json({
            success: true,
            data: allOffer
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
});

// Post a new Offer
router.post("/", async (req, res) => {
    const offerDataList = new offerController({
        name:req.body.name,
        description:req.body.description,
        snippet:req.body.snippet,
        image:req.body.image,
        discount: req.body.discount,
        limit:req.body.limit,
        doe:req.body.doe,
        doi:req.body.doi,
        code:req.body.code,
        creator:req.body.creator,
        usedBy:req.body.usedBy,
    });
    offerDataList.save().then((create)=>{
        console.log("created a new offer");
        res.status(200).json(create);
    }).catch((error)=>{
        res.status(500).json({
            error:error,
            success:false,
        });
        console.error("Failed 4",error.message)
    });
    console.log("New Offer added")

});



module.exports = router;