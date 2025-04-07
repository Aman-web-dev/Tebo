import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from '../components/project-card'
import ProjectForm from "../components/project-form";
import { useModal } from "../hooks/useModal";
import { useAuth } from "../hooks/useAuth";
import TaskList from "../components/task-list";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:9000";

function Projects() {
  const { user } = useAuth();
  const [editableProj, setEditableProj] = useState();
  const { modalOpen, createProject, editProject } = useModal();
  const [projects, setProjects] = useState([]);

  const editProjectToggle = (project) => {
    setEditableProj(project);
    editProject();
  };

  useEffect(() => {
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

    fetchProjects();
  }, [modalOpen]);

  return (
    <div className="grid grid-cols-4 gap-4">
      {projects.map((project) => (
        <ProjectCard
          key={project._id}
          project={project}
          createProject={createProject}
          editProject={editProjectToggle}
        />
      ))}
      {modalOpen && user.designation == "Admin" ? (
        <ProjectForm project={editableProj} />
      ) : (
        ""
      )}
      {user.designation == "User" && modalOpen == true ? <TaskList /> : ""}
    </div>
  );
}

export default Projects;
