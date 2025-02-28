const wishlist=require("../models/wishlistModels");

exports.addToWishlist=async(req,res) =>{
    try{
        const{ productID} = req.body;
        const userId=req.user.id;
         
        let wishlist=await Wishlist.findOne({user:userId});

        if(!wishlist) {
            wishlist=new Wishlist({user:userId,products:[]});
        }
        if(!wishlist.products.includes(productId)) {
            wishlist.products.push(productId);
            await wishlist.save();
            return res.status(201).json({message:"Product added to wishlist",wishlist});
        }else {
            return res.status(400).json({message:"product already in wishlist"});
        }
    }catch (error) {
        res.status(500).json({error:error.message});
    }
};


exports.getWishlist=async(req,res)=>{
    try{
        const wishlist =await Wishlist.findOne({ user:req.user.id}).populate(
            "products",
            "name price"
        );
        if (!wishlist){
            return res.status(404).json({message:"Wishlist not found"});
        }
        res.json(wishlist);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};


exports.removeFromWishlist = async(req,res)=> {
    try{
        const userId = req.user.id;
        const productId = req.params.id;

        let wishlist= await Wishlist.findOne({user:userId});

        if(!wishlist) {
            return res.status(404).json({message:"Wishlist not found"});
        }
        wishlist.products = wishlist.products.filter(
            (id) =>
                id.toString() !== productId
        );

        await wishlist.save();
        res.json({message:"product removed from wishlist",
            wishlist
        });
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};