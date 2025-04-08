import React, { useState, useEffect } from "react";
import { useModal } from "../hooks/useModal";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

import  FormModal  from "./modal";


const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function ProjectForm() {
  const { modalOpen, editableProduct,mode, createProject, closeModal, editProject} =
    useModal();
  const { user } = useAuth();

  // Initialize form state with empty values when creating, project data when editing
  const [projectData, setProjectData] = useState({
    name: mode === "create" ? "" : editableProduct?.name || "",
    description: mode === "create" ? "" : editableProduct?.description || "",
    priority: mode === "create" ? "none" : editableProduct?.priority || "none",
  });

  // Update form data when project prop changes
  useEffect(() => {
    if (editableProduct && mode == "edit") {
      setProjectData({
        name: editableProduct.name || "",
        description: editableProduct.description || "",
        priority: editableProduct.priority || "None",
      });
    }
  }, [editableProduct, mode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };




  const handleSubmit = async () => {
    const payload = {
      ...(mode === "edit" && editableProduct ? { id: editableProduct.id } : {}),
      name: projectData.name,
      description: projectData.description,
      priority: projectData.priority,
    };
    console.log(payload, user);

    try {
      const token = user?.token;
      if (!token) throw new Error("No authentication token found");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let response;
      console.log(mode);
      if (mode === "edit" && editableProduct?._id) {
        console.log("editing");
        response = await axios.put(
          `${SERVER_URL}/project/${editableProduct._id}`,
          payload,
          config
        );
        editProject(response.data);
      } else {
        response = await axios.post(`${SERVER_URL}/project`, payload, config);
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
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
    </FormModal>
  );
}



export default ProjectForm;
