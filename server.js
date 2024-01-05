require("dotenv").config();
const express = require("express");
const cors = require("cors");
require('./connection.js')
const userRoute = require("./router/user.js");
const product = require("./router/product.js");
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/product", product);
app.get('/',(req,res)=>{
res.send('manish kumar panwar')
})

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
