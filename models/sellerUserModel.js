const mongoose = require("mongoose");
// Creating a database schema/structure for the Seller Users

const sellerUserSchema = new  mongoose.Schema({
    dName:{
        // Full name of the User
        type:String,
        required: true,
    },
    dt:{
        // Date and time of the user created
        type:Date,
        default: Date.now,
    },
    dPassword:{
        // Password of the user 
        type:String, 
        required:true,
    },
    dUser:{
        // Username
        type:String,
        required:true,
    },
    dUsrCnt:{
        // User count must br 1 or 0
        type:Number,
        required:true,
    },
    status:{
        // user status admin/stocker/ delivery agent / store
        type:String,
        required:true,
    }
})

module.exports= mongoose.model('sellerUser',sellerUserSchema)