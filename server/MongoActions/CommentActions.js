import Comment from "../model/commentModel.js";

export async function createComment(commentObj) {
  const newComment = new Comment(commentObj);

  const savedComment = await newComment.save();

  const populatedComment = await Comment.findById(savedComment._id)
    .populate("user", "username") 
    .populate("task", "title"); 

  return populatedComment;
}

export async function getCommentById(commentId) {
  try {
    const comment = await Comment.findById(commentId)
      .populate("user", "username email") 
      .populate("task", "title project"); 
    if (!comment) {
      throw new Error("Comment not found");
    }
    return comment;
  } catch (error) {
    console.error("Error fetching comment by ID:", error);
    throw error;
  }
}

export async function getAllComments() {
  try {
    const comments = await Comment.find()
      .populate("user", "username email")
      .populate("task", "title project")
      .sort({ createdAt: -1 }); // Sort by newest first
    return comments;
  } catch (error) {
    console.error("Error fetching all comments:", error);
    throw error;
  }
}

export async function deleteComment(commentId) {
  try {
    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment) {
      throw new Error("Comment not found");
    }
    return { message: "Comment deleted successfully", deletedComment: comment };
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
}

export async function getCommentsByUser(userId) {
  try {
    const comments = await Comment.find({ user: userId })
      .populate("user", "username email")
      .populate("task", "title project")
      .sort({ createdAt: -1 });
    return comments;
  } catch (error) {
    console.error("Error fetching comments by user:", error);
    throw error;
  }
}

export async function getCommentsByProject(projectId) {
  try {
    // First, find all tasks in the project
    const tasks = await Task.find({ project: projectId }).select("_id");
    const taskIds = tasks.map((task) => task._id);

    // Then, find comments linked to those tasks
    const comments = await Comment.find({ task: { $in: taskIds } })
      .populate("user", "username email")
      .populate("task", "title project")
      .sort({ createdAt: -1 });
    return comments;
  } catch (error) {
    console.error("Error fetching comments by project:", error);
    throw error;
  }
}

export async function getCommentsByTask(taskId) {
  try {
    const comments = await Comment.find({ task:taskId })
      .populate("user", "username email")
      .populate("task", "title project")
      .sort({ createdAt: -1 });
    return comments;
  } catch (error) {
    console.error("Error fetching comments by task:", error);
    throw error;
  }
}
