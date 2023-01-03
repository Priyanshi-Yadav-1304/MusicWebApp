const mongoose = require("mongoose");

const songModel = new mongoose.Schema({
    socialUrl:[{
        image_url:String,
        song_url:String,
    }],
    image:{
        public_id:String,
        secure_url:String,
    },
    artistName:String,
    songTitle:String,
    instaId:String,
    user_id:String,
    clicked:{
        type:Number,
        default:0
    }
})
const song = mongoose.model("song",songModel);
module.exports =  song;