import Project from "../model/projectModel.js";

export const findProjectById = async (projectId) => {
  return await Project.findById(projectId);
};

export const getAllProjects = async () => {
  return await Project.find({});
};

export const createProject = async (projectObj) => {
  return await Project.create(projectObj);
};

export const deleteProject = async (projectId) => {
  return await Project.findByIdAndDelete(projectId);
};

export const updateProject = async (projectId, updateObj) => {
  return await Project.findByIdAndUpdate(projectId, updateObj, { new: true });
};
