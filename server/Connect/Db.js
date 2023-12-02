const mongoose=require('mongoose');
require('dotenv').config();

const DB_URL=process.env.DB_URL;
const connectDbo=async()=>{
  try {
    await  mongoose.connect(DB_URL);
    console.log('DB has been Connected');
 } catch (error) {
    console.log(error.message);
 };
};

module.exports=connectDbo;