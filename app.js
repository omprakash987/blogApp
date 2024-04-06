
require("dotenv").config();
const path = require('path')
const cookieParser = require('cookie-parser')

const mongoose = require('mongoose')
const Blog = require('./models/blog')



const express = require('express')
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog')

const { checkForAuthentactionCookie } = require("./middleware/authentication");
 

const app = express(); 
const PORT = 3000; 

mongoose.connect(process.env.MONGODB_URI).then(()=>console.log("mongodb connceted")).catch((err)=>console.log("mongodb error")); 


app.set("view engine","ejs"); 
app.set("views",path.resolve("./views")); 
app.use(express.json()); 
app.use(express.urlencoded({extended:false})); 
app.use(cookieParser())
app.use(checkForAuthentactionCookie('token')); 

app.use(express.static(path.resolve("./public")));


app.get('/',async(req,res)=>{
    const allBlogs = await Blog.find({})
    res.render("home",{
        user:req.user,
        blogs:allBlogs,
        
    })
})


app.use("/user",userRoute); 
app.use("/blog",blogRoute); 


app.listen(PORT,()=>console.log(`server started at port ${PORT}`)); 
