import express from "express";
import {
  createUser,
  findUserByIdentifier,
  findAllUser
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

router.get('/', async (req, res) => {
  try {
    const allUsers = await findAllUser();

    if (!allUsers || allUsers.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    res.status(200).json({
      message: 'Users retrieved successfully',
      users: allUsers,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      message: 'Server error while fetching users',
      error: error.message, // Optional: include error details in dev mode
    });
  }
});

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
  console.log(password,user)
  if(user==null){
    res.send("wrong Pass")
  }
  const authorized = await hasher.checkHash(user.password, password);
  if (authorized) {
    const token = jwt.sign(
      {
        data:user,
      },
      "ThisIsPrivateKeyAndYouCantCopyIt",
      { expiresIn: "7d" }
    );
    const userObj = {
      id:user._id,
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
