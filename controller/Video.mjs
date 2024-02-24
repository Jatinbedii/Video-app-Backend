import jwt from "jsonwebtoken";
import Video from "../schema/Video.mjs";
import ffmpeg from "fluent-ffmpeg";
async function UploadVideo(req, res) {
  const { url, title, description, thumbnail } = req.body;
  if (!url || !title || !description) {
    return res.json({ error: "Fill all the fields" });
  }
  let token = req.headers.authorization;
  if (token) {
    token = token.split(" ")[1];
  } else {
    return res.json({ error: "No Authentication Token" });
  }

  try {
    const data = jwt.verify(token, "jatinbedi");
    if (!data) {
      return res.json({ error: "No Authentication Token" });
    }

    ffmpeg.ffprobe(url, async (err, metadata) => {
      if (err) {
        return res.json({ error: "Some Unexpected error" });
      } else {
        if (thumbnail) {
          const video = await Video.create({
            title,
            description,
            url,
            createdBy: data.id,
            duration: metadata.format.duration,
            thumbnail,
          });
        } else {
          const video = await Video.create({
            title,
            description,
            url,
            createdBy: data.id,
            duration: metadata.format.duration,
          });
        }
        return res.status(201).json({ message: "Video Created" });
      }
    });
  } catch (error) {
    return res.json({ error: "Some Unexpected error" });
  }
}
async function getVideos(req, res) {
  const videos = await Video.find();
  res.json(videos);
}

async function getVideo(req, res) {
  const { id } = req.body;

  try {
    const video = await Video.findOne({ _id: id });
    video.views = video.views + 1;
    await video.save();
    res.json(video);
  } catch (Err) {
    res.json({ error: "Video missing" });
  }
}

async function CommentHandler(req, res) {
  try {
    const video = await Video.findById(req.body.video);
    video.comments.push({
      user: req.body.id,
      comment: req.body.comment,
    });

    const vid = await video.save();
    res.json({
      user: req.body.id,
      comment: req.body.comment,
    });
  } catch (error) {
    console.log(error);
    res.json({ error: "Comment not saved" });
  }
}

async function Like(req, res) {
  try {
    const video = await Video.findById(req.body.video);
    const index = video.likes.indexOf(req.body.id);
    if (index == -1) {
      video.likes.push(req.body.id);
      await video.save();
      return res.status(201).json({ message: "Liked the video" });
    } else {
      video.likes.splice(index, 1);
      await video.save();
      return res.json({ message: "removed" });
    }
  } catch (error) {
    res.json({ error: "video not found" });
  }
}
export { getVideo, getVideos, UploadVideo, CommentHandler, Like };
