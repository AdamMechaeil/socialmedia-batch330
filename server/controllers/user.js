import Comment from "../models/comment.js";
import Post from "../models/post.js";
import Replies from "../models/replies.js";
import User from "../models/user.js";

async function requestsFormatter(reqArray){
  let user=[]
   for await (let id of reqArray){
    const returnValue=await retriveUser(id);
      user.push(returnValue)
  }
  return user;
}

async function retriveUser(id){
  try {
    const query=User.findById(id);
    query.select("_id firstname lastname profilePicture")
    const user=await query.exec();
    return user;
  } catch (error) {
    console.log(error);
  }
}

export const getAllUsersWithoutAuth=async(req,res)=>{
  try {
    const query = User.find();
    query.select("_id name profilePicture");
    const users=await query.exec();
    res.send({users,msg:"All users"});
  } catch (error) {
    console.log(error);
  }
}

export const getAllUsers=async(req,res)=>{
  try {
    const user=await User.findById(req.user.id)
    const query = User.find({
      _id:{$not:{$eq:req.user.id},$nin:user.friends}
    });
    query.select("_id name profilePicture");
    const users=await query.exec();
    res.send({users,msg:"All users"});
  } catch (error) {
    console.log(error);
  }
}

export const getUserById = async (req, res) => {
  try {
    const { _id } = req.params;
    const query = User.findById(_id);
    query.select("name phone email profilePicture friends requestSent");
    const user = await query.exec();
    res.send({ user, msg: "User By ID" });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await User.findByIdAndUpdate(_id, req.body);
    res.send("Updated");
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req,res)=>{
  try {
    const userId=req.user.id;
    await User.updateMany({
      $pull:{followers:userId}
    })
    await Post.deleteMany({
      creator:userId
    })
    await Comment.deleteMany({
      creator:userId
    })
    await Replies.deleteMany({
      creator:userId
    })

    await User.findByIdAndDelete(userId);
    res.send("Deleted")
  } catch (error) {
    console.log(error);
  }
}

export const sendFollowRequest = async (req, res) => {
  try {
    const sender = req.user.id;
    const reciever = req.params._id;

    await User.updateOne({ _id: sender }, { $push: { requestSent: reciever } });
    await User.updateOne(
      { _id: reciever },
      { $push: { requestsReceived: sender } }
    );

    res.send("Request Sent");
  } catch (error) {}
};

export const acceptFollowRequest = async (req, res) => {
  try {
    const acceptingPerson = req.user.id;
    const sender = req.params._id;
    const acceptingUser = await User.findOne({ _id: acceptingPerson });
    const senderUser = await User.findOne({ _id: sender });

    await User.updateOne(
      { _id: acceptingPerson },
      { $push: { friends: sender } }
    );
    await User.updateOne(
      { _id: sender },
      { $push: { friends: acceptingPerson } }
    );

    const updatedAcceptor = acceptingUser.requestsReceived.filter((ele) => {
      if (ele != sender) return ele;
    });
    const updatedSender = senderUser.requestSent.filter((ele) => {
      if (ele != acceptingPerson) {
        return ele;
      }
    });
    await User.findOneAndUpdate(
      { _id: acceptingPerson },
      { requestsReceived: updatedAcceptor }
    );
    await User.findOneAndUpdate(
      { _id: sender },
      { requestSent: updatedSender }
    );

    res.send("Request accepted");
  } catch (error) {
    console.log(error);
  }
};

export const requestsReceived=async(req,res)=>{
    try {
      const id= req.user.id;
      const query=User.findOne({_id:id});
      query.select("requestsReceived");
      const user=await query.exec();
      const requestsReceived=await requestsFormatter(user.requestsReceived);
      res.send({requestsReceived,msg:"All requests received"})
    } catch (error) {
      console.log(error);
    }
}

export const searchUsers=async(req,res)=>{
  try {
    const users=await User.find({
     name:req.body.name
    })
    res.send({users,msg:"Users by search"});
  } catch (error) {
    console.log(error);
  }
}
