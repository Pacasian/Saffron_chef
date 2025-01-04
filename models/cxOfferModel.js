const mongoose = require('mongoose');

const cxOfferModel = new mongoose.Schema({
    firebaseID : {
        type : String ,
        required : true ,
    } ,
    email : {type : String , required : true} ,
    mongoIdCx : {type : String} ,
    usedCode : {type : [String]} ,
    usedCodeID : {type : [String]} ,

})

module.exports = mongoose.model('cxOffer',cxOfferModel);