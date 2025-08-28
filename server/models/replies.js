import mongoose, { Schema } from "mongoose";

const repliesSchema=new Schema({
   text:{
    type:String
   },
   date:{
    type:String,
    default:new Date()
   },
   likes:{
      type:Array
   },
   replies:{
      type:Array
   },
   postId:{
      type:String
   }
   ,
   commentId:{
      type:String
   },
   creator:{
    type:String
   }
})

const Replies=mongoose.model("Replies",repliesSchema);
export default Replies;
