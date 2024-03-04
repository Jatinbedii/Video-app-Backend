import User from "../schema/User.mjs";

async function ChangeImage(req, res) {
  const { url, id } = req.body;

  const user = await User.findById(id);

  user.profile = url;

  await user.save();

  res.status(201).json({ message: "successfully done" });
}

async function GetUsers(req, res) {
  const users = await User.find();
  res.json(users);
}

export { GetUsers, ChangeImage };
