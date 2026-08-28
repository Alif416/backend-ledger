const userModel = require("../models/user.model");
const jsonwebtoken = require("jsonwebtoken");

// user register controller

async function userRegisterController(req, res) {
    const { email,password,name} = req.body;

    const isExist= await userModel.findOne({
        email:email,
    })

    if (isExist){
        return res.status(400).json({
            message:"Email already exists",
            status:"error"
        })
    }
    const user = await userModel.create({
        email,password,name
    }
    )
    const token = jwt.sign({ userId: user.__id }, process.env.JWT_SECRET,{expiresIn:"3d"});
    res.cookies("token",token)

    res.status(201).json({
        user:{
            id:user.__id,
            email:email,
            name:user.name
        }
    })
}

    //why res.cookies- because we want to store the token in the cookies so that we can use it for authentication in the future
module.exports = { userRegisterController};