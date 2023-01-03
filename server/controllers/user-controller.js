const User = require("../models/userModel");
const cloudinary = require("cloudinary")
const brcypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const signUp = async(req,res) =>{
    try{
        const {email,password} = req.body;
        // const encryptPassword = await brcypt.hash(password,10);
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
            res.status(200).send({message:"paid user",success:true})
        }else{
            res.status(401).send({message:"unpaid user",success:false})
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
            }
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

            const token = await jwt.sign({id:user._id},'qwertyui876543efbgfre345678ytfdxer4567yhbgvfr56');

            res.status(200).cookie('token',token,{
                httpOnly:true
            }).send({message:'user signed in successfully',success:true})
        }else{
            res.status(401).send({message:'wrong email or password',success:false,isValidUser})
        }
    }catch(err){
        res.status(400).send({message:err,success:false})
    }
}
const updateProfile = async(req,res)=>{
    try{
        const {id,image,about,profession,instaId} = req.body;
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
            const updatedUser = await user.update({about,profession,instaId});
        }
        res.status(200).send({message:"successful",success:true,user});
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
module.exports = {
    signUp,
    isPaidUser,
    saveDetails,
    getDetails,
    signIn,
    updateProfile,
    addSong,
    getAllUsers
}