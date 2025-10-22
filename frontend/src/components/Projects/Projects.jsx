import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ProjectForm from "./ProjectForm";
import { BASE_URL } from "../../config";
import { usePortfolio } from "../../context/context";

import "./Projects.scss";

const Projects = () => {
  const { projects, loading } = usePortfolio();
  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState(null);


  const handleAddNew = () => {
    setEditProject(null);
    setShowForm(true);
  };

  const handleEdit = (project) => {
    setEditProject(project);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Project deleted!");
      fetchProjects();
    } catch (err) {
      toast.error("Failed to delete project.");
    }
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    fetchProjects();
  };

  return (
    console.log("Projects in Projects component:", projects),
    <div className="projects-container">
      <div className="projects-header">
        <h2>Projects</h2>
        <button className="add-btn" onClick={handleAddNew}>
          + Add Project
        </button>
      </div>

      {showForm && (
        <ProjectForm
          project={editProject}
          onClose={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}

      <div className="projects-list">
        {projects.length === 0 ? (
          <p>No projects added yet.</p>
        ) : (
          projects.map((proj) => (
            <div className="project-card" key={proj._id}>
              <img src={proj.thumbnailUrl} alt={proj.title} />
              <div className="project-info">
                <h3>{proj.title}</h3>
                <p>{proj.description}</p>
                <p>
                  <strong>Tech Stack:</strong> {proj.techStack?.join(", ")}
                </p>
                <p>
                  <strong>Tags:</strong> {proj.tags}
                </p>
                <div className="links">
                  {proj.githubLink && (
                    <a href={proj.githubLink} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                  )}
                  {proj.liveLink && (
                    <a href={proj.liveLink} target="_blank" rel="noreferrer">
                      Live
                    </a>
                  )}
                </div>
              </div>
              <div className="project-actions">
                <button onClick={() => handleEdit(proj)}>Edit</button>
                <button
                  className="delete"
                  onClick={() => handleDelete(proj._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Projects;
