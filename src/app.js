// 1. crete server instance also for server configuration we need to import the express module

const express = require("express");
const app=express();
const cookieParser=require("cookie-parser");
app.use(express.json());
app.use(cookieParser());

const authRouter=require('./routes/auth.routes')

app.use('/api/auth',authRouter)

module.exports=app;