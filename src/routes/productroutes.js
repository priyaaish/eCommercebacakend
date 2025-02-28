const express = require("express");
const router = express.Router();
const{  getProducts, createProduct, updateProduct, deleteProduct, 
    getProductById } = require("../controllers/productcontroller");
const protect = require("../middleware/authMiddleware");
const { create } = require('../models/productModel');

router.get("/",protect, getProducts);
router.post("/:id",protect, getProductById);
router.get("/",protect, createProduct);
router.get("/:id",protect, updateProduct);
router.get("/:id",protect, deleteProduct);
module.exports = router;