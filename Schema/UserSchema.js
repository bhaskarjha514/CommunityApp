const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true
    },
    name: {
        type:String,
        required: true
    },
    country: {
        type:String,
    },
    phone: {
        type:String,
        required:true,
        unique:true,
    },
    gender: {
        type:String,
    },
    email: {
        type:String,
    },
    subscription: {
        type: Boolean,
        default: false
    },
    subscription_validity: {
        type:Date
    },
    subscription_plan_name: {
        type:String,
    },
    bio: {
        type:String,
    },
    profile_url: {
        type:String,
    },
    categories_interested_in: {
        type:String,
    },
    age: {
        type:String,
    },
    coin: {
        type:String,
    },
    anonymous_name:{
        type:String
    },

    anonymous_profile_url:{
        type:String
    },

    anonymous_activated:{
        type:Boolean,
        default: false
    },
    
    location: {
        type: {
          type: String,
          enum: ['Point'],
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },

    coin:{
        type:String,
    },
    device_id: {
        type:String,
    },

    created_at: {
        type:Date,
        defalut: Date.now
    }
},{versionKey: false});

const User = module.exports = mongoose.model('User',UserSchema)