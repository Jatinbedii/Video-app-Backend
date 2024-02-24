import mongoose from "mongoose";
const ShortsSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);
const Short = mongoose.model("Short", ShortsSchema);
export default Short;
