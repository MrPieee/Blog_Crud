require('dotenv').config();
const jwt=require('jsonwebtoken');

const cheakAuth=(req,res,next)=>{
    try {
        const {token}=req.cookies;
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if(err) return res.status(400).json(err);

            const {username,userId}=decoded;
            req.username=username;
            req.userId=userId;
            next();
        });
    } catch (error) {
        next('Authorization Failed');
        res.clearCookie('token');
        res.redirect('/logIn');
    }
};

module.exports=cheakAuth;