import React from "react";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/projectForm";
import { useModal } from "../hooks/useModal";

function Projects() {
  const { modalOpen, mode, createProject, closeModal, editProject } =
    useModal();

  return (
    <div className="grid grid-cols-4 gap-4">
      <ProjectCard createProject={createProject}/>
      <ProjectCard createProject={createProject}/>
      <ProjectCard createProject={createProject}/>
      <ProjectCard createProject={createProject}/>
      <ProjectCard createProject={createProject}/>
      <ProjectCard createProject={createProject}/>
      <ProjectCard createProject={createProject}/>
      <ProjectCard createProject={createProject}/>
      <ProjectCard createProject={createProject}/>
      <ProjectCard createProject={createProject}/>
      <ProjectCard createProject={createProject}/>
      <ProjectCard createProject={createProject}/>
      {modalOpen ? <ProjectForm closeModal={closeModal}/> : ""}
    </div>
  );
}

export default Projects;
