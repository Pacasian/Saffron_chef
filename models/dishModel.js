const mongoose = require("mongoose");


const dishModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // trim: true,
      },
      itemID: {
        type: String,
        
      },
      dat: {
        type: Date,
        default: Date.now,
      },
      quantity: {
        type: Number,
        // required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      offer: {
        type: Boolean,
        default: false,
      },
      discnt: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },
      calories: {
        type: Number,
        // required: true,
      },
  image: {
    type: String,
    validate: {
      validator: function(v) {
        return v === "" || /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/.test(v);
      },
      message: props => `${props.value} is not a valid image URL!`
    },
  },
  category: {
        type: String,
        required: true,
      },
      stock: {
        type: Boolean,
        default: true,
      }
});


module.exports = mongoose.model("dish",dishModel);