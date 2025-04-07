import React, { useState, useEffect } from "react";
import { useModal } from "../hooks/useModal";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:9000";

function ProjectForm({ project }) {
  const { modalOpen, mode, createProject, closeModal, editProject } =
    useModal();
  const { user } = useAuth();

  // Initialize form state with empty values when creating, project data when editing
  const [projectData, setProjectData] = useState({
    name: mode === "create" ? "" : project?.name || "",
    description: mode === "create" ? "" : project?.description || "",
    priority: mode === "create" ? "none" : project?.priority || "none",
    createdBy: user.username,
  });

  const [tasks, setTasks] = useState(
    mode === "create" ? [] : project?.tasks || []
  );

  // Update form data when project prop changes
  useEffect(() => {
    if (project && mode == "edit") {
      setProjectData({
        name: project.name || "",
        description: project.description || "",
        priority: project.priority || "None",
        createdBy: user.username,
      });
      setTasks(project.tasks || []);
    }
  }, [project, mode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createTasks = () => {
    const newTask = { title: "", description: "", assignedTo: "" };
    setTasks((prev) => [...prev, newTask]);
  };

  const handleTaskInput = (index) => (e) => {
    const { name, value } = e.target;
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[index] = {
        ...updatedTasks[index],
        [name]: value,
      };
      return updatedTasks;
    });
  };

  const handleSubmit = async () => {
    // Ensure createdBy is included in the payload
    const payload = {
      ...(mode === "edit" && project ? { id: project.id } : {}),
      name: projectData.name,
      description: projectData.description,
      priority: projectData.priority,
      createdBy:user.username,
      tasks: tasks,
    };
    console.log(payload,user)

    try {
      const token = user?.token;
      if (!token) throw new Error("No authentication token found");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let response;
      console.log(project._id)
      if (mode === "edit" && project?._id) {
        console.log("editing")
        response = await axios.put(
          `${SERVER_URL}/project/${project._id}`,
          payload,
          config
        );
        editProject(response.data);
      } else {
        response = await axios.post(
          `${SERVER_URL}/project`,
          payload,
          config
        );
        createProject(response.data);
      }

      closeModal();
    } catch (error) {
      console.error("Error submitting project:", error);
      // Consider adding user feedback here (e.g., toast notification)
    }
  };

  return (
    <FormModal closeModal={closeModal} mode={mode} handleSubmit={handleSubmit}>
      <div className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Project Name
          </label>
          <input
            disabled={mode == "edit" ? true : false}
            type="text"
            id="name"
            name="name"
            value={projectData.name}
            onChange={handleInputChange}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            placeholder="Tedo Project"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Project Description
          </label>
          <textarea
            id="description"
            disabled={mode == "edit" ? true : false}
            name="description"
            value={projectData.description}
            onChange={handleInputChange}
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            required
          />
        </div>

        <label
          htmlFor="priority"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select Priority
        </label>
        <select
          id="priority"
          name="priority"
          value={projectData.priority}
          onChange={handleInputChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="None">Choose Project Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <div className="overflow-y-scroll max-h-[20vh] px-4 ">
          {tasks.map((task, index) => {
            return (
              <div key={index} className="my-4 border-white border-5">
                <div className="mb-5">
                  <label
                    for="taskName"
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
                    for="taskDescription"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Task Description
                  </label>
                  <textarea
                    value={task.description}
                    type="text"
                    onChange={handleTaskInput(index)}
                    name="description"
                    id="description"
                    className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                    required
                  />
                </div>
                <div className="">
                  <label
                    for="assigned-Task"
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
                    <input
                      type="text"
                      name={"assignedTo"}
                      onChange={handleTaskInput(index)}
                      value={task.assignedTo}
                      id="website-admin"
                      className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="elonmusk"
                    />
                  </div>
                </div>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
              </div>
            );
          })}
        </div>

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

// Update FormModal to handle submit
function FormModal({ children, closeModal, mode, handleSubmit }) {
  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full bg-gray-500 bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full m-auto">
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-[#111827]">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {mode == "edit" ? "Edit Project" : "Create Project"}
            </h3>
            <button
              onClick={closeModal}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">{children}</div>
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              onClick={handleSubmit}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {mode == "edit" ? "Save Changes" : "Create"}
            </button>
            <button
              onClick={closeModal}
              type="button"
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectForm;
