const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");


const JWT_SECRET='I am a software developer';

//ROUTE1 Create a User using :POST"/api/auth/createuser".No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("Password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //If there are errors,return Bad request and errors
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    //Check whether the user with thi email exist already
    try{
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success,error: "sorry a user with this email is already exist" });
    }
    const salt= await bcrypt.genSalt(10);

   const secPassword = await bcrypt.hash (req.body.Password, salt);
    //create a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      Password: secPassword
    })
    const data={
        user:{
            id:user.id
        }
    }

    const jwtData=jwt.sign(data,JWT_SECRET);
    //console.log(jwtData);

    //.then((user) => res.json(user));
    //res.json(user)
    success=true;
    res.json({success,jwtData})
}
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");

    }
} 
);

//ROUTE2 Authenticate a User using :POST"/api/auth/login".No login required
router.post("/login",
    [
      
      body("email", "Enter a valid Email").isEmail(),
      body("Password", "Password can not be blank").exists({
        min: 5,
      }),
    ],
    async (req, res) => {
         //If there are errors,return Bad request and errors
       let  success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const{email,Password}=req.body;
    try{
        let user= await User.findOne({email});
        if(!user)
            {
              success=false
                return res.status(400).json({error:"sorry login with correct credentials"})
            }
            const PasswordCompare =await bcrypt.compare(Password,user.Password);
            if(!PasswordCompare)
                {
                  success=false
                    return res.status(400).json({success,error:"sorry login with correct credentials"})   
                }

                const data={
                    user:{
                        id:user.id
                    }
                }
                const jwtData=jwt.sign(data,JWT_SECRET);
                success=true;
                res.json({success,jwtData})

    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");

    }

    });
    
//ROUTE3 Get loggedin User Details using :POST"/api/auth/getuser". login required
router.post("/getuser",fetchuser, async (req , res) => {
    try{
        userId= req.user.id;
        const user = await User.findById(userId).select("-Password")
        res.send(user)
       }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
       }

    })

module.exports = router;
