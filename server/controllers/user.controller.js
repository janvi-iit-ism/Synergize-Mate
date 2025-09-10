import { User } from "../models/user.model.js";
// hash password
import bcrypt from "bcryptjs";
// carries token and verify details
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  try {
    const { fullname, email, password, phoneNumber } = req.body;
    if (!fullname || !email || !phoneNumber || !password) {
      return res.status(400).json({
        //  res.status(400).json({
        // return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const file = req.file;
    // cloudinary
    const fileUri = getDataUri(file);
    // console.log('File URI:', fileUri);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        // res.status(400).json({
        message: "User already exist with this email.",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      // role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    return res.status(201).json({
      // res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password ) {
      return res.status(400).json({
        //     res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        // res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        // res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    // check role is correct or not
    // if (role !== user.role) {
    //   return res.status(400).json({
    //     // res.status(400).json({
    //     message: "Account doesn't exist with current role.",
    //     success: false,
    //   });
    // }
    const tokenData = {
      userId: user._id,
      email: user.email,
    };
    const token =  jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      // role: user.role,
      profile: user.profile,
      wishlist: user.wishlist,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "None",
      })
      .json({
        // res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
        message: `Welcome back ${user.fullname}`,
        user,
        token,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      // res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async (req, res) => {
  // title= name
  // description= bio
  // Job= User
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { fullname: { $regex: keyword, $options: "i" } },
        { "profile.bio": { $regex: keyword, $options: "i" } },
        { "profile.year": { $regex: keyword, $options: "i" } },
        { "profile.dept": { $regex: keyword, $options: "i" } },
        { "profile.course": { $regex: keyword, $options: "i" } },
        { location: { $regex: keyword, $options: "i" } },
      ],
    };
    const users = await User.find(query)
      // .populate({
      //   path: "role",
      // })
      .sort({ createdAt: -1 });
    if (!users) {
      return res.status(404).json({
        message: "Users not found.",
        success: false,
      });
    }
    return res.status(200).json({
      users,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    // const job = await Job.findById(jobId).populate({
    //     path:"applications"
    // });
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }
    return res.status(200).json({ user, success: true });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    // const { fullname, email, phoneNumber, bio, skills } = req.body;
    const {
      fullname,
      email,
      bio,
      phoneNumber,
      skills,
      github,
      instagram,
      location,
      description,
      experience,
      dept,
      year,
      course,
    } = req.body;


  
    
    const file = req.file;
    // cloudinary ayega idhar
    const fileUri = getDataUri(file);
    // console.log("file:::", fileUri);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id; // middleware authentication
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }
    if (github) {
      const githubId = github.split("/").pop();

      try {
        const response = await axios.get(
          `https://api.github.com/users/${githubId}`
        );

        if (response.status === 200) {
          user.profile.github = github;
          // const newLink = new Link({ url: githubUrl });
          // await newLink.save();
          // return res.status(200).json({ message: 'Link verified and saved' });
        }
      } catch (error) {
        return res.status(404).json({ message: "GitHub user not found" });
      }
    }

    // updating data
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;
    // if (instagram) user.profile.instagram = instagram;
    if (location) user.profile.location = location;
    if (description) user.profile.description = description;
    if (experience) user.profile.experience = experience;
    if (dept) user.profile.dept = dept;
    if (year) user.profile.year = year;
    if (course) user.profile.course = course;

    // resume comes later here...
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url; // save the cloudinary url
      user.profile.resumeOriginalName = file.originalname; // Save the original file name
    }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
      github: user.profile.github,
      instagram: user.profile.instagram,
      location: user.profile.location,
      description: user.profile.description,
      experience: user.profile.experience,
      year: user.profile.year,
      dept: user.profile.dept,
      course: user.profile.course,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};


export const addToWishlist = async (req, res) => {
  const { _id } = req.user;
  // console.log(_id);
  // const _id= req.user;
  const { personId } = req.body;
  // console.log(personId);
  try {
    const user = await User.findById(_id);

    // const alreadyadded =  user.wishlist.find((id)=> id.toString()=== personId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const alreadyAdded = await user.wishlist.includes(personId);

    if (alreadyAdded) {
      // let user = await User.findByIdAndUpdate(
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: personId },
        },
        {
          new: true,
        }
      );
      return res.json(updatedUser);
    } else {
      // let user = await User.findByIdAndUpdate(
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: personId },
        },
        {
          new: true,
        }
      );
      // res.json(user);
      return res.json(updatedUser);
    }
  } catch (error) {
    // throw new Error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getWishlist = async (req, res) => {
  const { _id } = req.user;
  try {
    const findUser = await User.findById(_id).populate("wishlist");
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
};
