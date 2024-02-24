import Short from "../schema/Shorts.mjs";
import ffmpeg from "fluent-ffmpeg";
import jwt from "jsonwebtoken";
async function UploadShorts(req, res) {
  const { url, title, description } = req.body;
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
        const short = await Short.create({
          title,
          description,
          url,
          createdBy: data.id,
        });
        return res.status(201).json({ message: "Short Created" });
      }
    });
  } catch (error) {
    return res.json({ error: "Some Unexpected error" });
  }
}
async function GetShorts(req, res) {
  const shorts = await Short.find();

  res.json(shorts);
}
async function LikeShort(req, res) {
  try {
    const shorts = await Short.findById(req.body.short);
    const index = shorts.likes.indexOf(req.body.id);
    if (index != -1) {
      shorts.likes.splice(index, 1);
      await shorts.save();
      res.status(201).json({ message: "removed like" });
    } else {
      shorts.likes.push(req.body.id);
      await shorts.save();
      res.status(201).json({ message: "liked" });
    }
  } catch (error) {
    res.json({ error: "error" });
  }
}

async function AddComment(req, res) {
  try {
    const { id, short, comment } = req.body;

    const shortVideo = await Short.findById(short);

    shortVideo.comments.push({ user: id, comment: comment });

    await shortVideo.save();

    res.status(201).json({ comment: comment, user: id });
  } catch (error) {
    console.log(error);
    res.json({ error: "error" });
  }
}
async function IncreaseView(req, res) {
  const { short } = req.body;

  const myshort = await Short.findById(short);
  myshort.views = myshort.views + 1;

  myshort.save();
  res.status(201).json({ message: "Done" });
}
export { IncreaseView, AddComment, LikeShort, UploadShorts, GetShorts };
