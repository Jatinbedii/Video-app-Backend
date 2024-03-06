import express from "express";
import AuthRouter from "./routes/Auth.mjs";
import cors from "cors";
import connecttoDB from "./db/index.mjs";
import VideoRouter from "./routes/Video.mjs";
import UserRouter from "./routes/User.mjs";
import ShortsRouter from "./routes/Shorts.mjs";
import "dotenv/config";
import http from "http";
import { Server } from "socket.io";
import User from "./schema/User.mjs";
const socketIdToUserIdMap = {};
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: `${process.env.FRONTEND}`,
  },
});
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

io.on("connection", (socket) => {
  console.log("user connected");
  socket.emit("getuserid");
  socket.on("getuserid", ({ userID }) => {
    try {
      User.findById(userID).then((res) => {
        res.isLive = true;
        res.save();
      });

      socketIdToUserIdMap[socket.id] = userID;

      socket.emit("joinedroom");
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("videoframe", ({ frame, room }) => {
    socket.to(room).emit("frameRecieved", { frame });
  });

  socket.on("joinRoomToWatchStream", ({ room }) => {
    socket.join(room);
  });

  socket.on("sendchat", ({ room, user, message }) => {
   
   
    io.emit("MESSAGE", { room, user, message });
  });

  socket.on("disconnect", () => {
    const user = socketIdToUserIdMap[socket.id];
    delete socketIdToUserIdMap[socket.id];
    try {
      User.findById(user)
        .then((res) => {
          try {
            res.isLive = false;
            res.save();
          } catch (error) {
            console.log(error);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("error");
    }
  });
});

server.listen(process.env.PORT, () => {
  console.log("server running");
});
