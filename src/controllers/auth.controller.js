const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerUser(req,res){
    console.log("Request Body:", req.body);
    const {username,email,fullName:{firstName,lastName},password,}= req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{username},{email}]
    })

    if(isUserAlreadyExists){
        return res.status(400).json({
            message: isUserAlreadyExists.username == username? 
            "username already exists": "email already exists"
        })
    }
    const hash = await bcrypt.hash(password,10);
    const user = await userModel.create({
        username,
        email,
        fullName:{
            firstName,
            lastName
        },
        password:hash,
    })
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
    res.cookie("token",token)
    res.status(201).json({
        message:"user registered successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email, 
            fullName:user.fullName,
            
        }
    })
}




module.exports = {registerUser};
