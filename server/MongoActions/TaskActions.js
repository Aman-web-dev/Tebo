import Task  from '../model/taskModel.js'


export const createTask = async (taskObj) => {
  try {
    const newTask = await Task.create(taskObj);
    return newTask;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      throw new Error('Task not found');
    }
    return deletedTask;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

export const getTaskById = async (id) => {
  try {
    const task = await Task.findById(id)
      .populate('project', 'name')
      .populate('assignedTo', 'username') 
      .populate('createdBy', 'username');
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  } catch (error) {
    console.error('Error fetching task by ID:', error);
    throw error;
  }
};

export const getTasksByProject = async (projectId) => {
  try {
    const tasks = await Task.find({ project: projectId })
      .populate('assignedTo', 'username')
      .populate('createdBy', 'username')
      .sort({ createdAt: -1 }); // Newest first
    return tasks;
  } catch (error) {
    console.error('Error fetching tasks by project:', error);
    throw error;
  }
};

export const getTasksByUser = async (userId) => {
  try {
    const tasks = await Task.find({ assignedTo: userId })
      .populate('project', 'name')
      .populate('createdBy', 'username')
      .sort({ createdAt: -1 });
    return tasks;
  } catch (error) {
    console.error('Error fetching tasks by user:', error);
    throw error;
  }
};

export const updateTask = async (id, updateObj) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { ...updateObj, updatedAt: Date.now() }, // Update timestamp
      { new: true, runValidators: true } // Return updated doc, validate fields
    );
    if (!updatedTask) {
      throw new Error('Task not found');
    }
    return updatedTask;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const filterAndSortTasks = async (filterOptions = {}, sortOptions = {}) => {
  try {
    const query = Task.find(filterOptions)
      .populate('project', 'name')
      .populate('assignedTo', 'username')
      .populate('createdBy', 'username');
    
    if (Object.keys(sortOptions).length > 0) {
      query.sort(sortOptions); // e.g., { priority: 1, createdAt: -1 }
    }

    const tasks = await query.exec();
    return tasks;
  } catch (error) {
    console.error('Error filtering and sorting tasks:', error);
    throw error;
  }
};

