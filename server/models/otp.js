import mongoose from "mongoose";


const otpScheme=mongoose.Schema({
    sessionId:{
        type:String
    },
    otp:{
       type:String 
    },
    attempts:{
        type:Number,
        default:3
    }
})

const OTP=mongoose.model("OTP",otpScheme);
export default OTP
