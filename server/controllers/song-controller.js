const Song = require("../models/songModel");
const Service = require("../models/serviceModel")
const cloudinary = require("cloudinary");
const User = require("../models/userModel");


const addSongUrl = async(req,res)=>{
    try{
        const {url,user_id} = req.body;
        const song = await Song.create({
            socialUrl:url,
            user_id
        });
        res.status(201).send({message:'song created',song})
    }catch(err){
       res.status(400).send({message:err})
    }
}
const addSongCover = async (req,res) =>{
    try{
        const id = req.params.id;
        const {image,artistName,songTitle,instaId} = req.body;
        const { public_id, secure_url } = await cloudinary.v2.uploader.upload(
            image,
            {
              folder: "musicapp",
            }
        );
        const song = await Song.findByIdAndUpdate(id,{
            image:{
                public_id,
                secure_url
            },
            artistName,songTitle,instaId
        },{new:true});
        res.status(200).send({message:"song updated",song});
    }catch(err){
        res.status(400).send({message:err})
    }
}
const getSongDetails = async (req,res)=>{
    try{
        const id = req.params.id;
        const song = await Song.findById(id);
        await song.updateOne({clicked:song.clicked+1});
        res.status(200).send({message:'song found',song})       
    }catch(err){
        res.status(400).send({message:err})
    }
}
const getSongs = async(req,res) =>{
    try{
        const {user_id} = req.body;
        const songs = await Song.find({user_id});
        res.status(200).send({message:'songs found',songs});
    }catch(err){
        res.status(400).send({message:err});
    }
}
const getDetails = async(req,res)=>{
    try{
        const {user_id} = req.body;
        const songs = await Song.find({user_id});
        let totalLinks = 0;
        let totalClicks = 0;
        songs.forEach((song)=>{
            totalClicks +=  song.clicked;
            totalLinks +=  song.socialUrl.length;
        })
        const user =  await User.findById(user_id);
        res.status(200).send({message:'songs found',totalClicks,totalLinks,user})
    }catch(err){
        res.status(400).send({message:err})
    }
}
module.exports ={
    addSongUrl,
    addSongCover,
    getSongDetails,
    getSongs,
    getDetails
}