import React from "react";
import { useState } from "react";
import { useModal } from "../hooks/useModal";
import { Clock, AlertTriangle, CheckCircle, RotateCw,Edit,MessageSquare } from "lucide-react";

function TaskCard({ task, handleStatusChange, handleAddComment }) {
  const {openComment,editTask}=useModal()
  const [toggleOpen, setToggleOpen] = useState(false);
  const { priority, status, assignedTo } = task;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "done":
        return (
          <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
        );
      case "in_progress":
        return (
          <RotateCw className="w-5 h-5 text-blue-500 dark:text-blue-400" />
        );
      case "todo":
        return <Clock className="w-5 h-5 text-gray-500 dark:text-gray-400" />;
      default:
        return (
          <AlertTriangle className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        );
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      key={task.id}
      className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-5 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          {task.title}
        </h3>
        <div className="flex items-center space-x-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
              task.priority
            )}`}
          >
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
          <div className="flex items-center">
            {getStatusIcon(task.status)}
            <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
              {task.status === "in_progress"
                ? "In Progress"
                : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </span>
          </div>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {task.description}
      </p>

      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
        <div>Created: {formatDate(task.createdAt)}</div>
        <div>Updated: {formatDate(task.updatedAt)}</div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3 mb-3">
        <button
          onClick={() =>
            setStatusEditTask(statusEditTask === task.id ? null : task.id)
          }
          className="flex items-center px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-900 dark:hover:bg-blue-800 dark:text-blue-200 rounded-md transition-colors"
        >
          <Edit className="w-4 h-4 mr-1" />
          Edit Status
        </button>
        <button
          onClick={() =>
            openComment(task)
          }
          className="flex items-center px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 rounded-md transition-colors"
        >
          <MessageSquare className="w-4 h-4 mr-1" />
          {/* Comments ({task.comments.length}) */}
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
