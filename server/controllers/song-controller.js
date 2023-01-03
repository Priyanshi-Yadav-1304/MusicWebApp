const Song = require("../models/songModel");
const Service = require("../models/serviceModel")
const cloudinary = require("cloudinary");


const addSongUrl = async(req,res)=>{
    try{
        const {url} = req.body;
        const song = await Song.create({
            socialUrl:url
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
        res.status(200).send({message:'song found',song})       
    }catch(err){
        res.status(400).send({message:err})
    }
}
module.exports ={
    addSongUrl,
    addSongCover,
    getSongDetails
}