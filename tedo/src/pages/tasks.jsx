import React, { useState, useEffect } from "react";
import TaskCard from "../components/task-card";
import CommentDialogue from "../components/comment-dialogue";
import { useModal } from "../hooks/useModal";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [showMine, setShowMine] = useState(false);
  const { user } = useAuth();

  const { modalOpen } = useModal();

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, status: newStatus, updatedAt: new Date().toISOString() }
          : task
      )
    );
    setStatusEditTask(null);
  };

  const handleAddComment = (taskId) => {
    if (newComment.trim()) {
      setTasks(
        tasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                comments: [...task.comments, newComment],
                updatedAt: new Date().toISOString(),
              }
            : task
        )
      );
      setNewComment("");
    }
  };

  const getAllTasks = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.token) {
        throw new Error("User not authenticated");
      }

      const response = await axios.get(`${SERVER_URL}/tasks/`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(response.data.task || response.data);
      setTasks(response.data.tasks || response.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      // setError(err.response?.data?.message || "Failed to fetch tasks");
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, [modalOpen]);

  return (
    <div>
      <label class="inline-flex items-center cursor-pointer mx-4 my-4">
        <input
          onChange={() => setShowMine((prev) => !prev)}
          type="checkbox"
          value=""
          class="sr-only peer"
        />
        <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
        <span class="ms-3 text-sm  font-bold text-gray-900 dark:text-dark-890">
          Assigned To me
        </span>
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {tasks.map((task) =>
          user.username === task.assignedTo.username && showMine ? (
            <TaskCard
              key={task._id}
              task={task}
              handleStatusChange={handleStatusChange}
              handleAddComment={handleAddComment}
            />
          ) : !showMine ? (
            <TaskCard
              key={task._id}
              task={task}
              handleStatusChange={handleStatusChange}
              handleAddComment={handleAddComment}
            />
          ) : null
        )}

        {modalOpen && <CommentDialogue />}
      </div>
    </div>
  );
}

export default Tasks;
