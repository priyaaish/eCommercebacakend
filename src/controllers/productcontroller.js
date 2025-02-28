const Product = require("../models/productModel");
const getProducts = async(req, res) => {

        try{
            const { search, category, minPrice, maxPrice, page =1, limit = 10 } = req.query;
            let query = {};
            if (search) {
                query.name = { $regex: search, $options: "i" };
            }
            if (category) {
                query.category = category;
            }
            
            if (minPrice || maxPrice) {
                query.price = {};
                if (minPrice) query.price.$gte = Number(minPrice); 
                // Greater than or equal to minPrice
                if (maxPrice) query.price.$lte = Number(maxPrice);
               // Less than or equal to maxPrice 
            }
            const skip = (page - 1) * limit;
            const totalProducts = await Product.countDocuments(query);

            const products = await Product.find(query)
            .skip(skip)
            .limit(Number(limit));

            res.status(200).json({
                success: true,
                count: products.length,
                totalProducts,
                currentPage: Number(page),
                totalPages: Math.ceil(totalProducts / limit),
                products,
            });
} catch (error)
        {
            res.status(500).json({ success: false, message: "Server error", error });
        }
};

const getProductById = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
             return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true,product });
    }
    catch (error) {
    res.status(500).json({ success: true,message:"Server error", error });
    }
};

const createProduct = async(req, res) => {
    try {
        const { name, price, category, stock, description } = req.body;
        const product = new product({ name,
             price, 
             category, 
             stock, 
             description,
            createAt: new Date(),
         });
         await product.save();
         res.status(201).json({ success: true, product });
    } catch (error) {
        res.status(500).json({success: false, message:"Server error",error });
    }
};

const updateProduct = async(req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
                    if (!updatedProduct) {
                        return res.status(404).json({ 
                            success: false, message: "Product not found"
                         });
                    }
                    res.status(200).json({ success: true, 
                        updatedProduct});
    } catch (error)
    {
        res.status(500).json({ success:false,
             message: "Server error", error });
    }
};
const deleteProduct = async(req, res) => {
    try {
        const deletedProduct = await Product.
        findByIdAndDelete(req.params.id);
    if (!deletedProduct) 
        {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
   res.status(200).json({ success: true, message: "product deleted" });

   } catch (error) {
    res.status(500).json({ success: false,
        message: "server error", error });
   }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct }