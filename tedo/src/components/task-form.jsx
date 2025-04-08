import React, { useState, useEffect } from "react";
import FormModal from "./modal";
import { useModal } from "../hooks/useModal";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function TaskForm() {
  const [tasks, setTasks] = useState([]);
  const { editableProduct, closeModal } = useModal();
  const { user } = useAuth();
  const [alluser, setAlluser] = useState([]);

  const handleTaskInput = (index) => (e) => {
    const { name, value } = e.target;
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      // If assigning a user, set assignedTo as the user ID
      if (name === "assignedTo") {
        const selectedUser = alluser.find((user) => user._id === value);
        updatedTasks[index] = {
          ...updatedTasks[index],
          [name]: selectedUser, // Store full user object
        };
      }else {
        updatedTasks[index] = {
          ...updatedTasks[index],
          [name]: value,
        };
      }
      return updatedTasks;
    });
  };

  const createTasks = () => {
    const newTask = { title: "", description: "", assignedTo: "", priority: "None", status: "pending" };
    setTasks((prev) => [...prev, newTask]);
  };

  const saveTasks = async () => {
    console.log("Save tasks called");
    console.log(tasks);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const response = await axios.post(
        `${SERVER_URL}/tasks/`,
        { taskList: tasks.map(task => ({ ...task, project: editableProduct?._id })) }, // Add project ID
        config
      );
      closeModal();
      return response.data;
    } catch (error) {
      console.error("Error saving tasks:", error);
      throw error;
    }
  };

  const fetchUserNames = async (userToken) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      const response = await axios.get(`${SERVER_URL}/user`, config); // Adjusted endpoint
      const users = response.data.users; // Full user objects
      console.log(users);
      setAlluser(users); // Store full user objects
      return users.map(user => user.username); // Return usernames if needed elsewhere
    } catch (error) {
      console.error("Error fetching usernames:", error);
      throw error;
    }
  };

  const fetchTasks = async (projectId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.get(`${SERVER_URL}/tasks/project/${projectId}`, config);
      setTasks(response.data); // Set tasks directly
      return response.data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (editableProduct?._id && user?.token) {
      fetchTasks(editableProduct._id);
      console.log(editableProduct)
      fetchUserNames(user.token); // Pass token explicitly
    }
    console.log(tasks)
  }, [editableProduct, user?.token]);

  return (
    <FormModal saveTasks={saveTasks}>
      <div className="overflow-y-scroll max-h-[60vh] px-4">
        {tasks?.map((task, index) => (
          <div key={index} className="my-4 border-white border-5">
            <div className="mb-5">
              <label
                htmlFor="taskName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Task Name
              </label>
              <input
                value={task.title}
                onChange={handleTaskInput(index)}
                name="title"
                type="text"
                id="taskname"
                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                placeholder="Tedo Project"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="taskDescription"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Task Description
              </label>
              <textarea
                value={task.description}
                onChange={handleTaskInput(index)}
                name="description"
                id="description"
                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="priority"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={task.priority}
                onChange={handleTaskInput(index)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="None">Choose Task Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="mb-5">
              <label
                htmlFor="task-status"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select Status
              </label>
              <select
                id="task-status"
                name="status"
                value={task.status}
                onChange={handleTaskInput(index)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="None">Choose Task Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div className="">
              <label
                htmlFor="assigned-Task"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Assign Task
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>
                </span>
                <select
                  name="assignedTo"
                  // defaultValue={task.assignedTo.username}
                  value={task.assignedTo._id || ""} // Use _id directly
                  // disabled={task?.assignedTo?.username}
                  onChange={handleTaskInput(index)}
                  className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                >
                  <option value="">{task?.assignedTo?.username?task?.assignedTo?.username:"Select a user"}</option>
                  {alluser.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.username}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
          </div>
        ))}
        <button
          onClick={createTasks}
          type="button"
          className="text-white my-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          + Add tasks
        </button>
      </div>
    </FormModal>
  );
}

export default TaskForm;