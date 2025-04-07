import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task', // Links comment to a task
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Links to the user who commented
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  const Comment = mongoose.model('Comment', CommentSchema);

  export default Comment;