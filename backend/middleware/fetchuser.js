const jwt = require('jsonwebtoken');

const JWT_SECRET='I am a software developer';

const fetchuser = (req,res,next)=>{
    // Get the user from jwt token and add id to req object

    const token = req.header('jwt-Data');
    if(!token){
        res.status(401).send ({error:"please authenticate using a valid token"})
    }
    try{
        const data = jwt.verify(token,JWT_SECRET)
        req.user=data.user;
        next()
        }
   catch(error){
    res.status(401).send ({error:"please authenticate using a valid token"})
   }
}
module.exports = fetchuser;