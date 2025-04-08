import express from 'express';
const router = express.Router();

import {
  createTask,
  deleteTask,
  getTaskById,
  getTasksByProject,
  getTasksByUser,
  updateTask,
  filterAndSortTasks
} from '../MongoActions/TaskActions.js'




router.post('/', async (req, res) => {
  // Restrict to admin only if no user_id is provided
  if (req.user.designation !== 'Admin' && !req.user._id) {
    return res.status(403).json({ message: 'Only admins can create tasks' });
  }
  try {
    const { taskList } = req.body;

    if (!taskList || !Array.isArray(taskList)) {
      return res.status(400).json({ message: 'taskList must be an array' });
    }

    const createdTasks = [];
    const updatedTasks = [];

    // Process each task in the taskList
    for (const task of taskList) {
      const taskObj = {
        title: task.title,
        description: task.description || '',
        project: task.project,
        assignedTo: task.assignedTo,
        status: task.status || 'pending',
        priority: task.priority || 'medium',
        createdBy: req.user._id,
      };

      // If the task has an _id, check if it exists and needs updating
      if (task._id) {
        const existingTask = await getTaskById(task._id);

        if (existingTask) {
          // Check if the task has changed
          const hasChanges =
            existingTask.title !== taskObj.title ||
            existingTask.description !== taskObj.description ||
            existingTask.project.toString() !== taskObj.project ||
            existingTask.assignedTo?.toString() !== taskObj.assignedTo ||
            existingTask.status !== taskObj.status ||
            existingTask.priority !== taskObj.priority;
console.log(hasChanges)
          if (hasChanges) {
            // Update the existing task
            const updatedTask = await updateTask(
              task._id,
              taskObj,
            );
            updatedTasks.push(updatedTask);
          }
          // If no changes, skip it (no action needed)
          continue;
        }
      }

      // If no _id or task doesn’t exist, create a new task
      const newTask = await createTask(taskObj);
      createdTasks.push(newTask);
    }

    res.status(201).json({
      message: 'Tasks processed successfully',
      createdTasks,
      updatedTasks,
    });
  } catch (error) {
    console.error('Error processing tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



router.get(
  '/:id',
  async (req, res) => {
    try {
      const task = await getTaskById(req.params.id);
      res.json(task);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
);

// GET /tasks/project/:projectId - Get all tasks in a project
router.get(
  '/project/:projectId',
  async (req, res) => {
    const projectId=req.params.projectId;
    try {
      const tasks = await getTasksByProject(projectId);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// GET /tasks/user/:userId - Get all tasks assigned to a user
router.get(
  '/user/:userId',
  async (req, res) => {

    try {
      const tasks = await getTasksByUser(req.params.userId);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// PUT /tasks/:id - Update a task
router.put(
  '/:id',
  async (req, res) => {


    try {
      const task = await getTaskById(req.params.id);
      
      // Only admin or assigned user can update
      if (req.user.designation !== 'admin' && task.assignedTo._id.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized to update this task' });
      }

      const updateObj = {
        title: req.body.title || task.title,
        description: req.body.description || task.description,
        status: req.body.status || task.status,
        priority: req.body.priority || task.priority
      };

      const updatedTask = await updateTask(req.params.id, updateObj);
      res.json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
);

// DELETE /tasks/:id - Delete a task (Admin only)
router.delete(
  '/:id',
  async (req, res) => {

    if (req.user.designation !== 'admin') {
      return res.status(403).json({ message: 'Only admins can delete tasks' });
    }

    try {
      const deletedTask = await deleteTask(req.params.id);
      res.json({ message: 'Task deleted successfully', task: deletedTask });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
);

// POST /tasks/filter - Filter and sort tasks
router.post(
  '/filter',
  async (req, res) => {

    try {
      const filterOptions = req.body.filter || {};
      const sortOptions = req.body.sort || {};
      const tasks = await filterAndSortTasks(filterOptions, sortOptions);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

export default router;