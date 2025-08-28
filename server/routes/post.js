import express from "express";
import {
  addComments,
  addReplies,
  createPosts,
  deleteComment,
  deletePost,
  getPostById,
  getPosts,
  likeComments,
  likePost,
  searchPostsUsingTags,
  searchPostsUsingText,
  updateComment,
  updatePost,
} from "../controllers/post.js";
import { authenticator } from "../middlewares/authenticator.js";

const postRouter = express.Router();

postRouter.get("/getPosts", authenticator, getPosts);
postRouter.post("/createPost", authenticator, createPosts);
postRouter.put("/updatePost/:_id", authenticator, updatePost);
postRouter.delete("/deletePost/:_id", authenticator, deletePost);
postRouter.get("/getPostById/:_id", authenticator, getPostById);
postRouter.put("/likePost/:_id", authenticator, likePost);
postRouter.put("/addComment/:_id", authenticator, addComments);
postRouter.put("/likeComment/:_id", authenticator, likeComments);
postRouter.put("/addReply/:_id", authenticator, addReplies);
postRouter.put("/updateComment/:_id", authenticator, updateComment);
postRouter.delete("/deleteComment/:_id", authenticator, deleteComment);
postRouter.post("/searchPostsByTags", authenticator, searchPostsUsingTags);
postRouter.post("/searchPostUsingText",authenticator,searchPostsUsingText);

export default postRouter;
