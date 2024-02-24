import express from "express";
import {
  registrationHandler,
  LoginHandler,
  getuser,
} from "../controller/Auth.mjs";

const AuthRouter = express.Router();
AuthRouter.post("/register", registrationHandler);
AuthRouter.post("/login", LoginHandler);
AuthRouter.get("/user", getuser);
export default AuthRouter;
