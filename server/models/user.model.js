import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique: true
    }, 
    phoneNumber:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required : true
    },
    wishlist: [{ type:mongoose.Schema.Types.ObjectId, ref:"User"}],
    profile:{
        bio :{type: String},
        dept: {type: String},
        year: {type: String},
        course: {type: String},
        skills: [{type:String}],
        description: {type: String},
        github: {type: String},
        instagram: {type: String},
        experience: {type: String},
        location: {type: String},
        resume: {type: String},
        resumeOriginalName: {type: String},
        company : {type: mongoose.Schema.Types.ObjectId, ref:'Company'},
        profilePhoto:{
            type:String,
            default: ""
        }
    }
}, {timestamps:true});

export const User= mongoose.model('User', userSchema);