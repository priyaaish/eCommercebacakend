const Cart =require("../models/cartModel");
const Product = require("../models/productModel");
// add item to Cart
// use the routes POST/api/Cart
// accessibility is private
const addToCart = async(req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId =req.user.id;

        //validite product
        const product = await Product.findById(productId);
        if(!product) return res.status(400).json({ message : "product not found!"});

        const cartItem = new Cart({ userId, product, quantity });
        await cartItem.save();

        req.status(201).json({ success :true , cartItem});

    } catch {
        res.status(500).json({ success: false, message: "server error", error});
    }
};

// get cart item
// route GET/ api/cart

const  getCartItem = async(req, res) => {
    try {
        const cartItem = await Cart.find({
            userId: res.user.id 
        }).populate("productId");
        res.status(200).json({success: true,cartItem});
    } catch (error)
    {
        res.status(500).json({ success: false,message: "server error", error});

    }
}; 
module.exports= { addToCart, getCartItem};