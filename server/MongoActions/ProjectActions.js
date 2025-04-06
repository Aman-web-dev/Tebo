import Project from "../model/projectModel.js";

export const findProjectById = async (projectId) => {
  const project = await Project.findById(projectId);
  return project;
};

export const getAllProjects = async (filterObj) => {
  const projects = await Project.find(filterObj);
};

export const createProject = async (projectObj) => {
  const status = await Project.create(projectObj);
  return status;
};

export const deleteProject = async (projectId) => {
  const status = await Project.findOneAndDelete();
  return status;
};
export const updateProject = async (proejctId) => {
  const status = await Project.findOneAndUpdate();
};
