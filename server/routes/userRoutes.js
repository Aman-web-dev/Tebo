import express from "express";
import {
  createUser,
  findUserByIdentifier,
} from "../MongoActions/userActions.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

const hasher = {
  hashPassword: async (password) => {
    if (!password) throw new Error("Password is required");
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  },
  checkHash: async (hash, dbPass) => {
    const match = await bcrypt.compare(dbPass, hash);
    return match;
  },
};

router.post("/signup", async (req, res) => {
  const { email, username, password, designation } = req.body;
  const hash = await hasher.hashPassword(password);
  const user = createUser({
    email,
    username,
    designation,
    password: hash,
  });
  res.send(user);
});

router.post("/login", async (req, res) => {
  const { email, username, password } = req.body;
  const identifier = email || username;
  const user = await findUserByIdentifier(identifier);
  const authorized = await hasher.checkHash(user.password, password);
  if (authorized) {
    const token = jwt.sign(
      {
        data: {
          username: user.username,
          email: user.email,
          designation: user.designation,
        },
      },
      "ThisIsPrivateKeyAndYouCantCopyIt",
      { expiresIn: "7d" }
    );
    const userObj = {
      email:user.email,
      username: user.username,
      designation: user.designation,
      token,
    };
    res.send(userObj);
  }else{
    res.send("wrong Pass");
  }
});

export default router;
