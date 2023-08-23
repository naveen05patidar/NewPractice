const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let User = new Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    mobile:{
        type:Number
    }
})

module.exports = mongoose.model('User',User);