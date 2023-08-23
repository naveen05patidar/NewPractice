const express = require('express');
const bcrypt = require('bcrypt');
const Router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../model/user.model.js');
const jwtSecret = 'naveenpatia232#&@*#patidarjiboll';

Router.route('/post').post(async (req,res)=>{

const salt = await bcrypt.genSalt(10);
const secPassword = await bcrypt.hash(req.body.password,salt);

const obj = {
    name: req.body.name,
    email: req.body.email,
    password: secPassword,
    mobile:req.body.mobile
}

let user = await new User(obj);

await user.save().then((user)=>{
    res.status(200).json({success:true,user:"data Saved"});
}).catch(err=>{
    res.status(500).json({err:"Server Error"});
})
});

// Router.route('/login').post(async (req,res)=>{
// const email = req.body.email;
// const password = req.body.password;

// try {
//     const pwdData = await User.findOne({email});

//     if(!pwdData){
//         res.status(400).send('please inter valid Email')
//     }

//     const CompareData = await bcrypt.compare(password,pwdData.password);

//     if(!CompareData){
//         res.status(400).send('please inter valid Password')
//     }
//     const data = {
//         id:pwdData.email
//     }
//     const token = await jwt.sign(data,jwtSecret);

//     res.status(200).json({success:true,token:token})

// } catch (error) {
//    res.status(500).json({error:"Server Error"}); 
// }
// })

Router.route('/login').post(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const pwdData = await User.findOne({ email });

        if (!pwdData) {
            return res.status(400).json({ error: 'Please enter a valid Email' });
        }

        const compareData = await bcrypt.compare(password, pwdData.password);

        if (!compareData) {
            return res.status(400).json({ error: 'Please enter a valid Password' });
        }

        const data = {
            id: pwdData.email
        };
        const token = await jwt.sign(data, jwtSecret);

        res.status(200).json({ success: true, token: token });

    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
});



Router.route('/userfind/:userid').get(async (req,res)=>{
const uid =req.params.userid;

await User.findOne({userId:uid}).then((user)=>{
    res.status(200).json({user});
}).catch(err=>{
    res.status(500).json({err:"Internal Server Error Please try after some time"})
})
})


// orderRouter.route('/orderfind').get(async (req,res)=>{
//     await Order.find().then((order)=>{
//         res.status(200).json({order});
//     }).catch((err)=>{
//         res.status(500).json({err:"Server Error"})
//     })
// })

module.exports = Router;


