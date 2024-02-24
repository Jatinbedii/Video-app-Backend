import express from "express";
import { ChangeImage, GetUsers } from "../controller/User.mjs";
import { verifyjwt } from "../middleware/jwt.mjs";

const UserRouter = express.Router();
UserRouter.patch("/changeimage", verifyjwt, ChangeImage);
UserRouter.get("/users", GetUsers);
export default UserRouter;
