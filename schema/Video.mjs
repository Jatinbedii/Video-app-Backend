import mongoose from "mongoose";
const videoSchema = new mongoose.Schema(
  {
    url: String,
    title: String,
    description: String,
    createdBy: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: String,
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    thumbnail: String,
    duration: Number,
  },
  {
    timestamps: true,
  }
);
const Video = mongoose.model("Video", videoSchema);
export default Video;
