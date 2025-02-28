const mongoose=require("mongoose");
const orderSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    products: [{
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"product",
            required:true
        },
        quantity: {
            type: Number,
            required:true,
            min: 1,
        },
    }, ],
    totalAmount:{
        type: Number,
        required:true,
    },
    status: {
        type: String,
        enum:["pending","processing","Shipping","Delivered","Cancelled"],
        default: "Pending",
    },
    paymentStatus: {
        type: String,
        enum:["pending","Paid","Failed"],
        default:"Pending",
    },
},);