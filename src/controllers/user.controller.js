import {asyncHandler} from "../utils/asyncHandler.js";

import{apiError} from "../utils/apiError.js";

import {User} from "../models/user.model.js";

import { uploadCloudinary } from "../utils/cloudinary.js";

import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler (async (req , res) =>{
    // get user detail
    // take images and add to cloudnary
    // create user object , craete entry in db
    //remove pass and refresh token

    const {fullName , email , username, password} = req.body;
    console.log("email" , email);

    if(
        [fullName , email , username , password].some((field) => 
        field?.trim() === "")
    ){
        throw new apiError(400 , "all fields are required")
    }

    const ExistedUser = User.findOne({
        $or : [{email} , {username}]
    })

    if(ExistedUser){
        throw new apiError("409" , "userwith this email or username already exists")
       
    }

    const avatarLocalPath = req.files?.avatar[0]?.path

    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new apiError(400 , "avatar file is required")
    }

    const avatar = await uploadCloudinary(avatarLocalPath)

    const coverImage = await uploadCloudinary(coverImageLocalPath)
    if(!avatar){
        throw new apiError(400 , "avatar file is required")
    }

    const user = await User.create({
        fullName ,
        avatar : avatar.url,
        coverImage : coverImage?.url || "",
        email,
        password,
        username : username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new apiError(500 , "something went wrong in registration")
    }

    return res.status(200).json(
        new ApiResponse(200 ,createdUser , "you are registered successfully" ,  )
    )
})

export {registerUser}