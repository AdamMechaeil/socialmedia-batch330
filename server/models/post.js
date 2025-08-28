import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  caption: {
    type: String,
  },
  tags: {
    type: Array,
  },
  viewCount: { type: Number, default: 0 },
  likes: {
    type: Array,
    default: [],
  },
  comments: {
    type: Array,
    default: [],
  },
  creator: {
    type: String,
  },
});
postSchema.index({ title: "text", caption: "text" });
const Post = mongoose.model("Post", postSchema);
export default Post;
