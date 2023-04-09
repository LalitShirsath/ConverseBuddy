// const router = require("express").Router();
// const User = require("../models/User.js");
// const bcrypt = require("bcrypt");
// const axios = require('axios');

import express from "express";
const router = express.Router();
import User from "../models/User.js";
import bcrypt from "bcrypt";
import axios from 'axios';

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    console.log("user data while registration: ",newUser);
    //save user and respond
    const user = await newUser.save();

    let allUsers = await axios.get("http://localhost:8800/api/getAllUsers/users");
    // console.log("all users in auth : ",allUsers.data);

    let userData = allUsers.data;

    userData.map((u) => {
      

      if(u._id != user._id){
        // console.log("u is : ",u._id);
        // console.log("user is : ",user._id);

          axios.post('http://localhost:8800/api/conversations/', {
            senderId: user._id,
            receiverId: u._id
          })
          .then((response) => {
            // console.log(response);
          }, (error) => {
            console.log(error);
          });
      }
        
    })


    res.status(200).json(user);
  } catch (err) {
    console.log("error is: ",err.message);
    res.status(500).json(err.message);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if(!user){
      res.status(404).json("user not found");
      return;
    }
      

    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if(!validPassword){
      res.status(400).json("wrong password");
      return;
    }

    console.log("now");
    
    res.status(200).json(user)
    
  } catch (err) {
    res.status(500).json(err)
  }
});

// router.post("/login", async (req, res) => {
//   try {
//    const user = await User.findOne({ email: req.body.email });
//    if(!user) {
//       return res.status(404).json("user not found");
//    }

//    const validPassword = await bcrypt.compare(req.body.password, user.password)

//    if(!validPassword) {
//      return res.status(400).json("wrong password")
//    } 

//    res.status(200).json(user)
//  } catch (err) {
//    res.status(500).json(err)
//  }
// });

export default router;
