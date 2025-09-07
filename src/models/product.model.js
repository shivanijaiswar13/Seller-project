const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        amount:{
            type:Number,
            default:"INR",
            enum:["INR","USD"]
        }
    },
    images:[{
        type:String,
    }],
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
})

const productModel = mongoose.model("product",productSchema);
module.exports = productModel;