import express from "express";
import { acceptFollowRequest, deleteUser, getAllUsers, getAllUsersWithoutAuth, getUserById, requestsReceived, searchUsers, sendFollowRequest, updateUser } from "../controllers/user.js";
import { authenticator } from "../middlewares/authenticator.js";
const userRouter=express.Router();

userRouter.get("/getAllUsersWithoutAuth",getAllUsersWithoutAuth);
userRouter.get("/getAllUsers",authenticator,getAllUsers);
userRouter.get("/getAllReceivedRequests",authenticator,requestsReceived)
userRouter.get("/getUserById/:_id",authenticator,getUserById);
userRouter.put("/updateUserById/:_id",authenticator,updateUser);
userRouter.delete("/deleteUser",authenticator,deleteUser);
userRouter.put("/sendFollowRequest/:_id",authenticator,sendFollowRequest);
userRouter.put("/acceptFollowRequest/:_id",authenticator,acceptFollowRequest)
userRouter.post("/searchUsers",authenticator,searchUsers);

export default userRouter;