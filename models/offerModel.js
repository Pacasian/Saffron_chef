const mongoose = require('mongoose');

const offerModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    snippet: {
        type: String,
        required: true,
    },
    image: String,
    discount: {
        type: Number,
        required: true,
    },
    limit: Number,
    doi: {
        type: Date,
        default: Date.now,
    },
    doe: {
        type: Date,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    creator: {
        type: String,
        required: true,
    },
    usedBy:[String],

})

module.exports = mongoose.model('offer',offerModel);