import mongoose, { Schema } from "mongoose";

const commentSchema=new Schema({
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
   }
   ,
   postId:{
      type:String
   }
   ,
   creator:{
    type:String
   }
})

const Comment=mongoose.model("Comment",commentSchema);
export default Comment;
