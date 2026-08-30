// 1. crete server instance also for server configuration we need to import the express module

const express = require("express");
const cookieParser=require("cookie-parser");
const authRouter=require('./routes/auth.routes')
const app=express();

app.use(express.json());
app.use(cookieParser());



app.use('/api/auth',authRouter)

module.exports=app;