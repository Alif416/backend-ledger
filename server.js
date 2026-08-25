

require('dotenv').config();
// to start the sercver we need to import the app instance from the app.js file
const app=require("./src/app");

const connectDB=require("./src/config/db");

// call the connectDB function to connect to the database
connectDB();

//start the server 

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})



// l5NoTVcANlcZdoTS
// labibalif2001_db_user