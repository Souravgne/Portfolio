import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { AiFillEye, AiFillGithub } from "react-icons/ai";

import ProjectForm from "./ProjectForm";
import { BASE_URL } from "../../config";
import { usePortfolio } from "../../context/context";

import "./Projects.scss";
import "../../container/Work/Work.scss";

const Projects = () => {
  const { projects, loading, fetchProjects } = usePortfolio(); // make sure fetchProjects is exposed in context
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
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Project deleted successfully!");
      fetchProjects?.(); // refresh list after delete
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete project.");
    }
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    fetchProjects?.(); // refresh after add/edit
  };

  return (
    <div className="projects-container">
      {/* Header */}
      <div className="projects-header">
        <h2>Projects</h2>
        <button className="add-btn" onClick={handleAddNew}>
          + Add Project
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <ProjectForm
          project={editProject}
          onClose={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}

      {/* Project List */}
      <div
        className="projects-list app__work-portfolio"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2rem",
          marginTop: "2rem",
        }}
      >
        {loading ? (
          <p className="p-text">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="p-text">No projects added yet.</p>
        ) : (
          projects.map((proj, index) => (
            <motion.div
              className="app__work-item app__flex"
              key={proj._id || index}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Thumbnail */}
              <div className="app__work-img app__flex">
                <img
                  src={proj.thumbnailUrl || "https://via.placeholder.com/400x300"}
                  alt={proj.title}
                />

                <motion.div
                  whileHover={{ opacity: [0, 1] }}
                  transition={{
                    duration: 0.25,
                    ease: "easeInOut",
                    staggerChildren: 0.5,
                  }}
                  className="app__work-hover app__flex"
                >
                  {proj.liveLink && (
                    <a href={proj.liveLink} target="_blank" rel="noreferrer">
                      <motion.div
                        whileInView={{ scale: [0, 1] }}
                        whileHover={{ scale: [1, 0.9] }}
                        transition={{ duration: 0.25 }}
                        className="app__flex"
                      >
                        <AiFillEye />
                      </motion.div>
                    </a>
                  )}
                  {proj.githubLink && (
                    <a href={proj.githubLink} target="_blank" rel="noreferrer">
                      <motion.div
                        whileInView={{ scale: [0, 1] }}
                        whileHover={{ scale: [1, 0.9] }}
                        transition={{ duration: 0.25 }}
                        className="app__flex"
                      >
                        <AiFillGithub />
                      </motion.div>
                    </a>
                  )}
                </motion.div>
              </div>

              {/* Content */}
              <div className="app__work-content app__flex">
                <h4 className="bold-text">{proj.title}</h4>
                <p className="p-text" style={{ marginTop: 10 }}>
                  {proj.description}
                </p>

                {proj.techStack?.length > 0 && (
                  <p className="p-text">
                    <strong>Tech Stack:</strong> {proj.techStack.join(", ")}
                  </p>
                )}

                <div className="app__work-tag app__flex">
                  <p className="p-text">{proj.tags}</p>
                </div>

                {/* Edit/Delete Buttons */}
                <div
                  className="project-actions app__flex"
                  style={{
                    marginTop: "10px",
                    gap: "10px",
                    justifyContent: "center",
                  }}
                >
                 <div
  className="project-actions app__flex"
  style={{
    marginTop: "10px",
    gap: "10px",
    justifyContent: "center",
  }}
>
  {/* ✏️ Edit Button */}
  <button
    onClick={() => handleEdit(proj)}
    style={{
      background: "#4CAF50",
      color: "#fff",
      border: "none",
      padding: "10px 18px",
      borderRadius: "6px",
      fontSize: "0.95rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.25s ease-in-out",
      boxShadow: "0 3px 8px rgba(76, 175, 80, 0.3)",
    }}
    onMouseEnter={(e) => {
      e.target.style.background = "#43A047";
      e.target.style.transform = "translateY(-2px)";
    }}
    onMouseLeave={(e) => {
      e.target.style.background = "#4CAF50";
      e.target.style.transform = "translateY(0)";
    }}
  >
    Edit
  </button>

  {/* 🗑️ Delete Button */}
  <button
    className="delete"
    onClick={() => handleDelete(proj._id)}
    style={{
      background: "#F44336",
      color: "#fff",
      border: "none",
      padding: "10px 18px",
      borderRadius: "6px",
      fontSize: "0.95rem",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.25s ease-in-out",
      boxShadow: "0 3px 8px rgba(244, 67, 54, 0.3)",
    }}
    onMouseEnter={(e) => {
      e.target.style.background = "#D32F2F";
      e.target.style.transform = "translateY(-2px)";
    }}
    onMouseLeave={(e) => {
      e.target.style.background = "#F44336";
      e.target.style.transform = "translateY(0)";
    }}
  >
    Delete
  </button>
</div>

                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Projects;
