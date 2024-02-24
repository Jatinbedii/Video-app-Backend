import express from "express";
import {
  UploadVideo,
  getVideos,
  CommentHandler,
  getVideo,
  Like,
} from "../controller/Video.mjs";
import { verifyjwt } from "../middleware/jwt.mjs";

const VideoRouter = express.Router();
VideoRouter.post("/upload", UploadVideo);
VideoRouter.get("/videos", getVideos);
VideoRouter.post("/video", getVideo);
VideoRouter.post("/like", verifyjwt, Like);
VideoRouter.post("/comment", verifyjwt, CommentHandler);
export default VideoRouter;
