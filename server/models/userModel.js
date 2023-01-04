const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
    email:String,
    name:String,
    password:String,
    isPaid:Boolean,
    isBlocked:Boolean,
    instaId:String,
    image:{},
    about:String,
    profession:String,
    onBoardingTime:Date,
    profileLinks:[]
},{timestamps:true})
const user = mongoose.model("user",userModel);
module.exports = user;
