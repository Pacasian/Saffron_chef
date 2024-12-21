const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({

    dName:{
        // Full name of the User
        type:String,
        required: true,
    },
    dEmail:{
        // Full name of the User
        type:String,
        required: true,
    },
    dPhone:{
        // Full name of the User
        type:String,
    },
    firebaseID:{
        // Full name of the User
        type:String,
        required:true,
    },
    address:{
        type:String,
    },
    addSec:{
        type:String,
    },
    dob:{
        // Full name of the User
        type:Date,
    },
    dtJoin:{
        // Date and time of the user created
        type:Date,
        default: Date.now,
    },
    dPassword:{
        // Password of the user
        type:String,
    },
    dUser:{
        // Username
        type:String,
    },
    image: {
        type: String,
    }
})


module.exports = mongoose.model('Customer',customerSchema);