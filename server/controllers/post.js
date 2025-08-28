import colors from "colors";
import Post from "../models/post.js";
import Comment from "../models/comment.js";
import Replies from "../models/replies.js";

async function commentFormatter(comments) {
  if (comments == undefined || comments.length == 0) return [];

  let returnObj = [];

  for await (let item of comments) {
    let comment = await Comment.findById(item);
    returnObj.push(comment);
  }

  return returnObj;
}

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.send({ posts, msg: "All posts" });
  } catch (error) {
    console.log(error.red.bold);
  }
};

export const createPosts = async (req, res) => {
  try {
    const { id } = req.user;
    const { title, image, caption, tags } = req.body;
    const blob = new Post({ title, image, caption, tags, creator: id });
    const createdPost = await blob.save();
    res.send({ createdPost, msg: "Created" });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async (req, res) => {
  try {
    const data = await Post.findOneAndUpdate(
      {
        _id: req.params._id,
        creator: req.user.id,
      },
      req.body
    );
    res.send({ data, msg: "updated" });
  } catch (error) {
    console.log(error.red.bold);
  }
};

export const deletePost = async (req, res) => {
  try {
    await Replies.deleteMany({
      postId: req.params._id,
    });

    await Comment.deleteMany({
      postId: req.params._id,
    });

    await Post.findOneAndDelete({
      _id: req.params._id,
      creator: req.user.id,
    });
    res.send({ msg: "Deleted" });
  } catch (error) {
    console.log(error.red.bold);
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params._id,
    });
    await Post.findByIdAndUpdate(
      req.params._id,
      { $inc: { viewCount: 1 } },
      { new: true }
    );
    const comments = await commentFormatter(post?.comments);
    res.send({ post, comments, msg: "Post" });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (req, res) => {
  try {
    const likedBy = req.user.id;
    await Post.updateOne(
      { _id: req.params._id },
      { $push: { likes: likedBy } }
    );
    res.send("Liked");
  } catch (error) {
    console.log(error);
  }
};

export const addComments = async (req, res) => {
  try {
    const text = req.body.text;
    const creator = req.user.id;
    const raw = new Comment({ text, creator, postId: req.params._id });
    const addedComment = await raw.save();
    await Post.updateOne(
      { _id: req.params._id },
      { $push: { comments: addedComment._id } }
    );
    res.send("Comment Added");
  } catch (error) {
    console.log(error);
  }
};

export const likeComments = async (req, res) => {
  try {
    const commentId = req.params._id;
    const likedBy = req.user.id;
    await Comment.updateOne({ _id: commentId }, { $push: { likes: likedBy } });
    res.send("Liked Comment");
  } catch (error) {
    console.log(error);
  }
};

export const addReplies = async (req, res) => {
  try {
    const commentId = req.params._id;
    const comment = await Comment.findOne({ _id: commentId });
    const creator = req.user.id;
    const raw = new Replies({
      text: req.body.text,
      creator,
      postId: comment.postId,
      commentId: commentId,
    });
    const addedReply = await raw.save();
    await Comment.updateOne(
      { _id: commentId },
      { $push: { replies: addedReply._id } }
    );
    res.send("Reply Added");
  } catch (error) {
    console.log(error);
  }
};

export const updateComment = async (req, res) => {
  try {
    await Comment.updateOne({ _id: req.params._id }, req.body);
    res.send("Updated");
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (req, res) => {
  try {
    await Replies.deleteMany({
      commentId: req.params._id,
    });

    await Comment.findOneAndDelete({ _id: req.params._id });
    res.send("deleted");
  } catch (error) {
    console.log(error);
  }
};

export const searchPostsUsingTags = async (req, res) => {
  try {
    const posts = await Post.find({
      tags: { $in: req.body.tags },
    });
    res.send({ posts, msg: "Posts through tags" });
  } catch (error) {
    console.log(error);
  }
};

export const searchPostsUsingText = async (req, res) => {
  try {
    const posts = await Post.find(
      { $text: { $search: req.body.searchText } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });
    res.send({ posts, msg: "Posts through text" });
  } catch (error) {
    console.log(error);
  }
};
