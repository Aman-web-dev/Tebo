import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true,unique:true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  designation:{type:String,required:true, enum: ["Admin","User"],},
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
