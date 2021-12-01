const express = require("express");

const router = express.Router();

const sendMail = require("../utils/send-mail");

const User = require("../models/user.model");

router.post("/",async (req,res)=>{
    try{

        const user = await User.create(req.body);
         
        sendMail(
            "a@a.com",
            `${req.body.mail}`,
            `Welcome to ABC system ${req.body.first_name}`, 
            `Hi ${req.body.first_name} Please confirm your address`,
            "<h1>some description from user </h1>"
            );

        return res.status(201).json({user});
    } catch(e) {
        return res.status(500).json({status : "failed", message : e.message})
    }
})

router.get("/",async (req,res)=>{
    try{

        const page =+req.query.page || 1;
        const size =+req.query.size || 2;

        const skip =(page-1)*size;

        const totalpages =Math.ceil(( await User.find().countDocuments())/size);

        const users = await User.find().skip(skip).limit(size).lean().exec();
         
        return res.json({users , totalpages});
    } catch(e) {
        return res.status(500).json({status : "failed", message : e.message})
    }
})



module.exports =router;