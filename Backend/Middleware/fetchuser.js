const { response } = require("express");
var jwt = require("jsonwebtoken");
const JWT_SECRET = "neelisag$oy";

const fetchuser=(req,res,next)=>{

   

   try {
     const token=req.header('auth-token');
   if(!token)
   {
    res.status(401).send({error :"unauthorized access"});
   }
    const data=jwt.verify(token,JWT_SECRET);
    req.user=data.user;
    next();
}
    catch (error) {
     res.status(500).send({error :"server error"});
   }
}

module.exports=fetchuser;