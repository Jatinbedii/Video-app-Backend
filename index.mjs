import express from "express";
import AuthRouter from "./routes/Auth.mjs";
import cors from "cors";
import connecttoDB from "./db/index.mjs";
import VideoRouter from "./routes/Video.mjs";
import UserRouter from "./routes/User.mjs";
import ShortsRouter from "./routes/Shorts.mjs";
const app = express();
connecttoDB();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
app.use("/api", AuthRouter);
app.use("/api", VideoRouter);
app.use("/api", UserRouter);
app.use("/api/shorts", ShortsRouter);
app.listen(3001, () => {
  console.log("server running");
});
