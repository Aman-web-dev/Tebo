import jwt from 'jsonwebtoken'
const secretKey = "ThisIsPrivateKeyAndYouCantCopyIt"; // use same secret you used to sign

export const checkToken = (req, res, next) => {
  const header = req.headers["authorization"];

  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }
      req.user = decoded.data; 
      next();
    });
  } else {
    res.sendStatus(403);
  }
};