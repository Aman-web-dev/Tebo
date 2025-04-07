import React, { useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/projectForm";
import { useModal } from "../hooks/useModal";
import.meta.env;

function Projects() {
  const { modalOpen, mode, createProject, closeModal, editProject } =
    useModal();

    useEffect(()=>{
      const apiUrl = import.meta.env.VITE_API_URL;
      console.log(apiUrl)
    })

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
      {modalOpen?<ProjectForm />:""}
    </div>
  );
}

export default Projects;
