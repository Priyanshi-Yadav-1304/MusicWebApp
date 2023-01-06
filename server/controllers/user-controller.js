const User = require("../models/userModel");
const cloudinary = require("cloudinary")
const brcypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const signUp = async(req,res) =>{
    try{
        const {email,password} = req.body;
        const user  = await User.create({email,password});
        res.status(201).send({success:true,message:"user signed up successfully",user})
    }catch(err){
        console.log(err);
        res.status(400).send({success:false,message:err})
    }
}
const isPaidUser = async (req,res) =>{
    try{
        const id = req.params.id;
        const user = await User.findById(id);
        if(user.isPaid){
            res.status(200).send({message:"paid user",success:true,user})
        }else{
            res.status(401).send({message:"unpaid user",success:false,user})
        }
    }catch(err){
        res.status(400).send({message:err,success:false})
    }
}
const saveDetails =  async (req,res) =>{
    try{
        const {name,instaId,image,id} = req.body;
        const { public_id, secure_url } = await cloudinary.v2.uploader.upload(
            image,
            {
              folder: "musicapp",
            }
          );
        const user = await User.findByIdAndUpdate(id,{
            name,instaId,
            image:{
                public_id,
                secure_url
            },
            onBoardingTime:new Date(),
            isOnBoarded:true,
        },{new:true});
        res.status(200).send({message:"profile created",success:true,user})
    }catch(err){
        console.log({err})
        res.status(400).send({message:err,success:false})
    }
}
const getDetails = async (req,res) =>{
    try{
        const {id} = req.body;
        const user = await User.findById(id);
        res.status(200).send({message:"successful",success:true,user});
    }catch(err){
        res.status(400).send({message:err,success:false})
    }
}
const signIn = async (req,res) =>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});

        // const isValidUser =  await brcypt.compare(password,user.password);
        if(user && user.password === password){
            if(user.isBlocked){
                res.status(403).send({message:'you are blocked by admin'})
            }else{
                const token = await jwt.sign({id:user._id},process.env.JWT_SECRET);
                res.status(200).cookie('token',token,{
                    httpOnly:true
                }).send({message:'user signed in successfully',success:true,user})
            }
        }else{
            res.status(401).send({message:'wrong email or password',success:false})
        }
    }catch(err){
        res.status(400).send({message:"something went wrong...",err,success:false})
    }
}
const updateProfile = async(req,res)=>{
    try{
        const {id,image,about,profession,instaId,service} = req.body;
        const user = await User.findById(id);
        if(image){
            await cloudinary.v2.uploader.destroy(user.image.public_id);
            const { public_id, secure_url } = await cloudinary.v2.uploader.upload(
                image,
                {
                  folder: "musicapp",
                }
              );
            let newImage = {public_id,secure_url}
            const updatedUser = await user.update({about,profession,instaId,image:newImage});
        }else{
            const updatedUser = await user.update({about,profession,instaId,profileLinks:service});
        }
        res.status(200).send({message:"successful",success:true});
    }catch(err){
        console.log({err})
        res.status(400).send({message:err,success:false})
    }
}


const addSong = async (req,res) =>{
    try{
        const {data} = req.body;
        res.send({data});
    }catch(err){
        res.status(400).send({message:err,success:false})
    }
}
const getAllUsers = async(req,res) =>{
   try{
    const users = await User.find({});
    res.status(200).send({users})
   }catch(err){
    res.status(400).send({message:err})
   }
}
const blockUser = async(req,res) =>{
    try{
        const {user_id} = req.body;
        const user = await User.findByIdAndUpdate(user_id,{
            isBlocked:true
        })
        res.status(200).send({message:'user blocked',user});
    }catch(err){
        console.log({err})
    }
}
const getUserById = async(req,res)=>{
    try{
        const {id} = req.params;
        const user = await  User.findById(id);
        res.status(200).send({message:'user found',user})
    }catch(err){
        console.log({err})
        res.status(400).send({message:err})
    }
}
const validAdmin = (req,res) =>{
    res.status(200).send({message:'ok',success:true})
}
module.exports = {
    signUp,
    isPaidUser,
    saveDetails,
    getDetails,
    signIn,
    updateProfile,
    addSong,
    getAllUsers,
    blockUser,
    getUserById,
    validAdmin
}