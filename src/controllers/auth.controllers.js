const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

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

    let user;
    try {
        user = await userModel.create({
            email,password,name
        })
    } catch (err) {
        // 11000 = duplicate key on the unique email index, in case another
        // request created the same email between the findOne above and here
        if (err.code === 11000){
            return res.status(400).json({
                message:"Email already exists",
                status:"error"
            })
        }
        throw err;
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET,{expiresIn:"3d"});
    res.cookie("token",token)

    res.status(201).json({
        user:{
            id:user._id,
            email:email,
            name:user.name
        },
        token:token
    })
}


async function userLoginController(req,res){
    const {email,password}=req.body;

    const user= await userModel.findOne({
        email:email
    }).select('+password')
    if (!user){
        return res.status(401).json({
            message:"Invalid email or password",
            status:"error"
        })
    }
    const isPasswordValid= await user.comparePassword(password);
    if (!isPasswordValid){
        return res.status(401).json({
            message:"Invalid email or password",
            status:"error"
        })
    }

    const token = jwt.sign({
        userId: user._id
    }, process.env.JWT_SECRET,{expiresIn:"3d"});
    res.cookie("token",token)

    res.status(200).json({
        user:{
            id:user._id,
            email:email,
            name:user.name
        },
        token:token
    })

}




    //why res.cookie- because we want to store the token in the cookies so that we can use it for authentication in the future
module.exports = { userRegisterController, userLoginController};
