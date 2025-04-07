import express from 'express';
const router = express.Router();
import { getTaskById } from '../MongoActions/TaskActions.js';
import { createComment } from '../MongoActions/CommentActions.js';



router.get('/:id', async (req, res) => {
  try {
    const comment = await getCommentById(req.params.id);
    res.json(comment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});


router.get('', async (req, res) => {
  try {
    const comments = await getAllComments();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});



router.post(
    '/',async (req, res) => {

      const { taskId, content } = req.body;
  
      try {
        const task = await getTaskById(taskId);
        if (!task) {
          return res.status(404).json({ message: 'Task not found' });
        }

        const comment = await  createComment({
          task: taskId,
          user: req.user._id, 
          content: content
        })

        res.status(201).json({
          message: 'Comment created successfully',
          comment: comment
        });
      } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ message: 'Server error' });
      }
    }
  );
  

router.delete('/:id', async (req, res) => {
  try {
    const result = await deleteComment(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const comments = await getCommentsByUser(req.params.userId);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/project/:projectId', async (req, res) => {
  try {
    const comments = await getCommentsByProject(req.params.projectId);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/task/:taskId', async (req, res) => {
  try {
    const comments = await getCommentsByTask(req.params.taskId);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;







