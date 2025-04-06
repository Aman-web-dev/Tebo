const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  assignedTo: { type: String, required: true },
});

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdBy:{type:String,required:true},
  description: { type: String },
  priority: {
    type: String,
    required: true,
    enum: ["High", "Medium", "Low", "None"],
  },
  tasks: [taskSchema],
},{timestamps:true});

const Project = mongoose.model("Project", projectSchema);


module.exports = Project;
