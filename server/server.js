import express from "express";
import bodyParser from "body-parser";
import projectRoutes from './routes/projectRoutes.js'
import userRoutes from './routes/userRoutes.js'
import mongoose from "mongoose";

const app = express();
const PORT = 9000;

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.json());


mongoose.connect("mongodb+srv://Aman:amanisbest@neina.nn9uj.mongodb.net/tebo?retryWrites=true&w=majority&appName=Neina", {
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
app.use("/project", projectRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
