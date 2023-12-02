const express=require('express');
const cors=require('cors');
const connectDbo = require('./Connect/Db');
const cookieParser = require('cookie-parser');
const app=express();
require('dotenv').config();
const authRouter = require('./Router/auth.router');
const userRouter = require('./Router/user.router');
const blogRouter = require('./Router/blog.router');


const PORT=process.env.PORT ||7858;


app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).sendFile(__dirname+"/view/home.html");
});
app.use('/api',authRouter);
app.use('/api',userRouter);
app.use('/api',blogRouter);


app.listen(PORT,async()=>{
    console.log(`The Blog Server Is running On http://localhost:${PORT}`);
    await connectDbo();
})