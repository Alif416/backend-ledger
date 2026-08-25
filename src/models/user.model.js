const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required for creating an account"],
        trim:true,
        lowercase:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Please fill a valid email address"],
        unique:[true,"Email already exists"]
    },
    name:{
        type:String,
        required:[true,"Name is required for creating an account"],
        trim:true,  

    },
    password:{
        type:String,
        required:[true,"Password is required for creating an account"],
        trim:true,
        minlength:[6,"Password must be at least 6 characters long"],
        select:false
    }

},{
    timestamps:true
})

