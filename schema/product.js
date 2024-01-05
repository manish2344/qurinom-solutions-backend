// const mongoose = require('mongoose');

const mongoose = require("mongoose");
const productschema= new mongoose.Schema({
name:{
    type: String,
    required: true,
},
price:{
    type: Number,
    required: true,
}, 
 avatar: {
    type: String,
  },
  cloudinary_id: {
    type: String,
  }, 
category:{
    type: String,
    required: true,
},
desc:{
    type: String,
    required: true,
},
})
const Product = new mongoose.model('Product',productschema);
module.exports = Product;