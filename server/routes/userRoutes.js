import express from "express";
import { createUser, findUserByIdentifier } from "../MongoActions/userActions.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';


const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hey Baby I am Your Boy");
});

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
  const { email, username, password } = req.body;
  const hash = await hasher.hashPassword(password);
  const user = createUser({
    email,
    username,
    password: hash,
  });
  res.send(user);
});

router.post("/login", async (req, res) => {
    const { email , username } = req.body;
    const identifier = email || username;
    const user =await findUserByIdentifier(identifier);
    console.log(user)
    res.send(user);
  });


router.patch("/", (req, res) => {
  res.send("Hey Baby How are you I am Your Girl");
});

router.delete("/", (req, res) => {
  res.send("Hey Baby How are you I am Your Girl");
});

export default router;
