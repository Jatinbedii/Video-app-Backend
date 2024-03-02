import express from "express";
import AuthRouter from "./routes/Auth.mjs";
import cors from "cors";
import connecttoDB from "./db/index.mjs";
import VideoRouter from "./routes/Video.mjs";
import UserRouter from "./routes/User.mjs";
import ShortsRouter from "./routes/Shorts.mjs";
import "dotenv/config";
const app = express();
connecttoDB();
app.use(express.json());
app.use(
  cors({
    origin: [process.env.FRONTEND],
  })
);
app.use("/api", AuthRouter);
app.use("/api", VideoRouter);
app.use("/api", UserRouter);
app.use("/api/shorts", ShortsRouter);
app.listen(process.env.PORT, () => {
  console.log("server running");
});
