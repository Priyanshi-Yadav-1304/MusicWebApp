const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
    email:String,
    name:String,
    password:String,
    isPaid:{
        type:Boolean,
        default:false,
    },
    isBlocked:{
        type:Boolean,
        default:false,
    },
    instaId:String,
    image:{},
    about:String,
    profession:String,
    onBoardingTime:Date,
    profileLinks:[],
    isOnBoarded:{
        type:Boolean,
        default:false,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }
},{timestamps:true})
const user = mongoose.model("user",userModel);
module.exports = user;
