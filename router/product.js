// const router = require("express"). 
const express = require('express');
const router =  express.Router();
const verifyToken = require('../middleware/auth')
const Product = require("../schema/product.js")
const cloudinary = require("./cloudnairy.js");
const upload = require("./multer.js"); 
router.get('/getAll', async (req, res) => {
    try {
        const product = await Product.find({})
        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json(error)
    }
})
router.post("/create", verifyToken,upload.single("image"),async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      let user = new  Product({
        name: req.body.name,
        desc: req.body.desc,
        price: req.body.price,
        category: req.body.category,
        avatar: result.secure_url,
        cloudinary_id: result.public_id,
        
      });
      await user.save();
      res.json(user);
    } catch (err) {
      console.log(err);
    }
  });
router.get('/find/:id', async (req, res) => {
    try {
        const product = await  Product.findById(req.params.id)
        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json(error)
    }
})

router.put("/updateproduct/:id", async (req, res) => {
    try {
        const updatedProduct = await  Product.findByIdAndUpdate(req.params.id,  req.body , { new: true })
        
        res.send(updatedProduct)
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

 
router.delete('/delete/:id',  async(req, res) => {
  try {
    const _id = req.params.id;
    const post = await Product.findByIdAndDelete(_id);
    res.send(post);
  } catch (error) {
    res.send(error);
  }
})

module.exports = router