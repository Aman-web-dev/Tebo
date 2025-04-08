import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "../components/project-card";
import ProjectForm from "../components/project-form";
import { useModal } from "../hooks/useModal";
import { useAuth } from "../hooks/useAuth";
import TaskForm from "../components/task-form";
import { Navigate } from "react-router";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function Projects() {
  const { user } = useAuth();
  const { modalOpen, mode, product } = useModal();
  const [projects, setProjects] = useState([]);

   const fetchProjects = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/project`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects", err);
      }
    };

  useEffect(() => {
    fetchProjects();
  }, [modalOpen]);

  if(user.designation=="User"){
   return  <Navigate to="/tasks" replace/>
  }
  return (
    <div className="grid grid-cols-4 gap-4">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
      {modalOpen &&
      user.designation == "Admin" &&
      (mode == "edit" || mode == "create") &&
      product == "project" ? (
        <ProjectForm />
      ) : (
        ""
      )}

      {modalOpen && user.designation == "Admin" && product == "tasks" ? (
        <TaskForm />
      ) : (
        ""
      )}

    </div>
  );
}

export default Projects;
