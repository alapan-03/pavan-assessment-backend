const mongoose = require("mongoose");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
// const sendEmail = require("./../utils/email")
let express = require('express'); 
let app = express() 
// let cookieParser = require('cookie-parser'); 
// let cookie = require("js-cookie")


// app.use(cookieParser()); 


exports.signup = async (req, res, next) => {
try{
    const newUser = await User.create(req.body);

    const token = jwt.sign({id: newUser._id}, "my-very-naughty-monkey-just-swallowed-pumkin-nuts")
    req.name = newUser.name;

     res.status(201).json({
        status: "success",
        token
     })

} catch(err){
    res.status(500).json({
        status: "fail",
        // message: "Error while creating an user"
        message: err
    })
}
}



exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide both email and password',
            });
        }

  
      // const user = await User.findOne({ email }).select('+password');
    //   console.log("user")
      const user = await User.findOne({ email });
    //   console.log(user)

  
      if (!user || !(await user.correctPassword(password, user.password))) {
        return req.status(400).json({
          status: 'fail',
          message: 'Incorrect email or password',
        });
        // return next();
      }
  
    //   console.log("token")
      const token = jwt.sign({ id: user._id },  "my-very-naughty-monkey-just-swallowed-pumkin-nuts");
    //   console.log(token)
  
      res.status(200).json({
        status: 'success',
        token,
      });
    } catch (err) {
      return res.status(400).json({
        status: 'fail',
        message: "Invalid or unentered credentials",
      });
    }
  };
  

  exports.getUsers = async (req, res, next) => {
    const user = await User.find();

    res.status(200).json({
        status: "success",
        user
    })
  }


exports.protect = async (req, res, next) => {
// 1. Check for token in header

try{
let token;
if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    token = req.headers.authorization.split(" ")[1];

    if(!token){
        return res.status(400).json({
            status: "fail",
            message: "Invalid or missing token"
        })
    }
}

// 2. Verify token

const decoded = await promisify(jwt.verify)(token, "my-very-naughty-monkey-just-swallowed-pumkin-nuts");
// console.log(decoded);


// 3. Check if the user still exists

const currUser = await User.findById(decoded.id);
// console.log(decoded.id)

if(!currUser){
    return res.status(400).json({
        status: "fail",
        message: "Account doesn't exist"
    })
}

req.user = currUser;

}catch(err){
  return res.status(500).json({
    status: "fail",
    message: err
  })
}
// console.log(req.user)
next()

}

