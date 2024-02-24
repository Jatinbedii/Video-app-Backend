import jwt from "jsonwebtoken";

function verifyjwt(req, res, next) {
  let token = req.headers.authorization;
  if (token) {
    token = token.split(" ")[1];
  } else {
    return res.json({ error: "No Authentication Token" });
  }

  const data = jwt.verify(token, "jatinbedi");
  if (!data) {
    return res.json({ error: "No Authentication Token" });
  }

  req.body.id = data.id;

  next();
}
export { verifyjwt };
