import express from "express";
import { verifyjwt } from "../middleware/jwt.mjs";
import {
  AddComment,
  GetShorts,
  LikeShort,
  UploadShorts,
  IncreaseView,
} from "../controller/Shorts.mjs";

const ShortsRouter = express.Router();
ShortsRouter.post("/upload", verifyjwt, UploadShorts);
ShortsRouter.get("/", GetShorts);
ShortsRouter.post("/like", verifyjwt, LikeShort);
ShortsRouter.post("/comment", verifyjwt, AddComment);
ShortsRouter.post("/increaseview", IncreaseView);
export default ShortsRouter;
