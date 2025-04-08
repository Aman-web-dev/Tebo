import express from "express";
import bodyParser from "body-parser";
import projectRoutes from './routes/projectRoutes.js'
import userRoutes from './routes/userRoutes.js'
import mongoose from "mongoose";
import { checkToken } from "./helper/tokenhelper.js";
import cors from "cors";
import commentRoutes from './routes/CommentRoutes.js'
import TaskRoute from './routes/TaskRoute.js'
import dotenv from 'dotenv'

dotenv.config()
const app = express();
const PORT = process.env.PORT || 9000;


app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.json());


app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
}));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.use("/user", userRoutes);
app.use("/project",checkToken,projectRoutes);
app.use("/tasks",checkToken,TaskRoute);
app.use('/comments',checkToken,commentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
