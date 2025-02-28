const express=require("express");
const { addToCart, getCartItem }=require("../controllers/cartController");
const protect=require("../middleware/authMiddleware");
const router=express.Router();
router.post("/",protect,addToCart);
router.post("/",protect,getCartItem);

module.exports=router;