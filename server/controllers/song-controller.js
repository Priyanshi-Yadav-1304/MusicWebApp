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
        const user = await User.findById(req.user_id);
        console.log({req})
        console.log(req.user_id)
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
        res.status(200).send({message:"song updated",song,username:user.username});
    }catch(err){
        res.status(400).send({message:err})
    }
}
const getSongDetails = async (req,res)=>{
    try{
        const id = req.params.id;
        const song = await Song.findById(id);
        await song.updateOne({clicked:song.clicked+1,clickTime:[...song?.clickTime,new Date()]});
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
const getSongToUpdate = async(req,res)=>{
    try{
        const id = req.params.id;
        const song = await Song.findById(id);
        const services = await Service.find({});
        let newServices = []
        services.forEach((service)=>{
            let flag = false;
            song.socialUrl.forEach((url)=>{
                if(service.secure_url === url.image_url){
                    newServices = [...newServices,{
                      image_url:url.image_url,
                      song_url:url.song_url
                    }] 
                    flag = true;
                }
            })
            if(!flag){
                newServices = [...newServices,{
                    image_url:service.secure_url,
                    song_url:''
                }]
            }
        })
        res.status(200).send({message:'song found',newServices});
    }catch(err){
        res.status(400).send({message:err});
    }
}
const getClicksByMonth = async(req,res) => {
    try{
        const {month,id} = req.params;
        const song = await Song.findById(id);
        let monthlyClicks = 0;
        console.log({song})
        if(song.clickTime.length == 0 ){
            res.status(200).send({monthlyClicks})
        }else{
            song.clickTime.forEach((time,index)=>{
                console.log({date:time.month() + 1})
                if(new Date(time).month() +1  == month){
                    monthlyClicks = monthlyClicks + 1;
                }
                if(song.clickTime.length-1 === index){
                    res.status(200).send({monthlyClicks})
                }
            })
        }
    }catch(err){
        res.status(400).send({message:err})
    }
}
const checkSong = async(req,res) => {
    try{
        const {id} = req.params;
        const song = await Song.findById(id);
        if(song.songTitle){
            res.status(409).send({message:'song already exists'});
        }else{
            res.status(200).send({message:'song not exists'});
        }
    }catch(err){
        res.status(400).send({message:err});
    }
}
module.exports ={
    addSongUrl,
    addSongCover,
    getSongDetails,
    getSongs,
    getDetails,
    getSongToUpdate,
    getClicksByMonth,
    checkSong
}