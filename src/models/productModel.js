const mongoose=require("mongoose");
const productSchema=new mongoose.Schema({
    name:{ type: String, require: true},
    price:{type:Number, require:true},
    category:{type:String,required:true},
    stocks:{type:Number,
        required:true
    },
    description:{ type: String, required: true},
});
module.exports=mongoose.model("Products",productSchema);