const express  = require('express');
const mongoose = require('mongoose');
const User     = require('../Schema/UserSchema');
const jwt      = require('jsonwebtoken');

const app = express();
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

app.post('/upload', upload.single('image'), (req, res) => {
    res.json({ imageUrl: req.file.path });
  });


exports.signIn = async(req,res)=>{
    const user = new User(req.body);

    const authResp = await User.findOne({'id':user.id}).exec();
    if(authResp){
        return res.status(200).json({status:true,message:'signin successfully!',token:getToken(authResp)});
    }else{
        await user.save(async(err,response)=>{
            if (err) return res.status(400).json({status:false,message:err});
            return res.status(200).json({status:true,message:'signin successfully!',token:getToken(response)});
        })
    }
}

exports.getMyProfile = async(req,res)=>{
    const userId = req.query.fId;

    if(!userId) return res.status(404).json({status:false,message:'UserId is required'});
    const profile = await User.findOne({'id':userId}).exec();
    if(profile){
        return res.status(200).json({status:true,message:'Profile fetch successfully!',profile:profile});
    }else{
        return res.status(404).json({status:false,message:'User not found!'});
    }
}

exports.updateProfile = async(req,res)=>{
    const user = new User(req.body);
    const authResp = await User.findOne({'id':user.id}).exec();

    if(authResp){
        await user.save(async(err,response)=>{
            if (err) res.status(400).json({status:false,message: 'couldn\'t save'})
            else{ res.status(200).json({'status':true,'message':'Profile updated',profile:authResp})}
        })
    }else{
        res.status(404).json({status:false,message:'User not found!'});
    }
}

exports.uploadProfilePicture = async(req,res)=>{
    let url = req.file.path;
    res.json({ imageUrl: req.file.path});
}

function getToken(user){
    return jwt.sign({user},process.env.JWT_SECRET_KEY,{ expiresIn: '1h'})
}