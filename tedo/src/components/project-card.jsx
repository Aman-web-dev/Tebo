import React, { useState } from "react";
import { useModal } from "../hooks/useModal";

function ProjectCard({project}) {
  const [toggleOpen, setToggleOpen] = useState(false);
  const {editProject,editTask } = useModal();

  const { priority } = project;

  const priorityBadgeColor = {
    high: "bg-red-500 text-white",
    medium: "bg-yellow-500 text-black",
    low: "bg-green-500 text-white",
    None: "none none text-gray-500",
  };
  const badgeColor = priorityBadgeColor[priority] || "bg-blue-500 text-white";

  return (
    <div
      className={`w-full max-w-sm border border-gray-200 rounded-lg shadow-sm dark:border-gray-200 relative dark:bg-gray-900`}
    >
     
      <span
        className={`absolute top-4 left-4 px-2 py-1 text-xs font-semibold rounded-full ${badgeColor}`}
      >
        {priority.toUpperCase()}
      </span>

      <div className="flex justify-end px-4 pt-4">
        {toggleOpen ? (
          ""
        ) : (
          <button
            onClick={() => setToggleOpen(true)}
            id="dropdownButton"
            data-dropdown-toggle="dropdown"
            className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
            type="button"
          >
            <span className="sr-only">Open dropdown</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
            </svg>
          </button>
        )}

        <div
          id="dropdown"
          className={`z-10 ${
            toggleOpen ? "" : "hidden"
          } text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700`}
        >
          <ul className="py-2" aria-labelledby="dropdownButton">
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Delete
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center pb-10">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src="https://images.unsplash.com/photo-1724382057884-c6f06cae3dff?q=80&w=2188&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {project.name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {project.description}
        </span>
        <div className="flex mt-4 md:mt-6">
          <a
            onClick={() => editProject(project)}
            href="#"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Edit Project
          </a>
          <a
            onClick={()=>editTask(project)}
            href="#"
            className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Add Task
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
