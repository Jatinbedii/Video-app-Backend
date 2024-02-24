import User from "../schema/User.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createToken } from "../utils/jwt.mjs";
const registrationHandler = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.json({ error: "Fill all the fields" });
    return;
  }

  const hash = bcrypt.hashSync(password, 10);
  try {
    const user = await User.create({
      username,
      email,
      password: hash,
    });

    res.status(201).json({ user });
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ error: "Username or Email already exists" });
    } else {
      return res.json({ error: "Unexpected Error" });
    }
  }
};

const LoginHandler = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username });

  if (user) {
    const comparePass = bcrypt.compareSync(password, user.password);
    if (!comparePass) {
      return res.json({ error: "Incorrect information" });
    }
    const token = createToken(user.id);
    return res.status(201).json({ jwt: token });
  } else {
    return res.json({ error: "Incorrect information" });
  }
};

const getuser = async (req, res) => {
  let token = req.headers.authorization;
  if (token) {
    token = token.split(" ")[1];
  } else {
    return res.json({ error: "No Authentication Token" });
  }
  try {
    const decode = jwt.verify(token, "jatinbedi");
    const data = await User.findOne({ _id: decode.id });
    return res.json(data);
  } catch (error) {
    return res.json({ error: "No Authentication Token" });
  }
};

export { getuser, LoginHandler, registrationHandler };
