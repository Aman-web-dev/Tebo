import jwt from 'jsonwebtoken'
const secretKey = process.env.SECRET_KEY || "ThisIsPrivateKeyAndYouCantCopyIt";

export const checkToken = (req, res, next) => {
  const header = req.headers["authorization"];

  console.log(secretKey);

  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.log(err)
        return res.status(401).json({ message: "Invalid or expired token" });
      }
      req.user = decoded.data; 
      next();
    });
  } else {
    res.sendStatus(403);
  }
};