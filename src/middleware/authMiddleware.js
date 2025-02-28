const jwt =require("jsonwebtoken");
const protect=( req,res,next) =>{
    let token =req.header("Authorization");
    if(!token) return res.status(401).json({message:"No token,authorization deined" });
    try{
        const decoded = jwt.verify(token.split(" ")[1],process.env.JWT_SCRECT);
        req.user=decoded;
        next();
    }catch(error) {
        res.status(401).json({message:"Invalid token"});
    }
};
module.exports=protect;