import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Experience.scss";
import { BASE_URL } from "../../config";

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [newExperience, setNewExperience] = useState({
    role: "",
    company: "",
    duration: { from: null, to: null },
    description: "",
    techStack: [],
  });
  const [editingExperience, setEditingExperience] = useState(null);

  const techOptions = [
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "MongoDB",
    "Firebase",
    "Tailwind",
    "TypeScript",
    "PostgreSQL",
    "AWS",
    "Docker",
    "Vite",
    "Redux",
    "SASS",
  ];

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/experiences`);
      setExperiences(res.data);
    } catch (error) {
      console.error("Error fetching experiences:", error);
    }
  };

  const handleTechSelect = (tech) => {
    setNewExperience((prev) => ({
      ...prev,
      techStack: prev.techStack.includes(tech)
        ? prev.techStack.filter((t) => t !== tech)
        : [...prev.techStack, tech],
    }));
  };

  const handleAddExperience = async () => {
    if (!newExperience.role || !newExperience.company) return;

    try {
      const res = await axios.post(`${BASE_URL}/api/experiences`, newExperience);
      setExperiences([...experiences, res.data]);
      setNewExperience({
        role: "",
        company: "",
        duration: { from: null, to: null },
        description: "",
        techStack: [],
      });
    } catch (error) {
      console.error("Error creating experience:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/experiences/${id}`);
      setExperiences(experiences.filter((exp) => exp._id !== id));
    } catch (error) {
      console.error("Error deleting experience:", error);
    }
  };

  const handleEdit = (exp) => {
    setEditingExperience(exp);
    setNewExperience({
      role: exp.role,
      company: exp.company,
      duration: exp.duration,
      description: exp.description,
      techStack: exp.techStack,
    });
  };

  const handleUpdate = async () => {
    if (!editingExperience) return;

    try {
      const res = await axios.put(
        `${BASE_URL}/api/experiences/${editingExperience._id}`,
        newExperience
      );
      setExperiences(
        experiences.map((exp) => (exp._id === res.data._id ? res.data : exp))
      );
      setEditingExperience(null);
      setNewExperience({
        role: "",
        company: "",
        duration: { from: null, to: null },
        description: "",
        techStack: [],
      });
    } catch (error) {
      console.error("Error updating experience:", error);
    }
  };

  return (
    <div className="experience-container">
      <h2>Experience</h2>

      {/* Existing Experiences */}
      <div className="experience-list">
        {experiences.map((exp) => (
          <div key={exp._id} className="experience-card">
            <div className="experience-info">
              <h3>{exp.role}</h3>
              <p className="company">{exp.company}</p>
              <p className="duration">
                {exp.duration.from
                  ? new Date(exp.duration.from).toLocaleString("default", {
                      month: "short",
                      year: "numeric",
                    })
                  : "N/A"}{" "}
                -{" "}
                {exp.duration.to
                  ? new Date(exp.duration.to).toLocaleString("default", {
                      month: "short",
                      year: "numeric",
                    })
                  : "Present"}
              </p>
              <p className="description">{exp.description}</p>
              <div className="tech-stack-display">
                {exp.techStack.map((tech, i) => (
                  <span key={i}>{tech}</span>
                ))}
              </div>
            </div>
            <div className="actions">
              <button onClick={() => handleEdit(exp)}>Edit</button>
              <button onClick={() => handleDelete(exp._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Form */}
      <div className="add-experience">
        <h3>{editingExperience ? "Edit Experience" : "Add New Experience"}</h3>

        <div className="input-row wide">
          <input
            type="text"
            value={newExperience.role}
            onChange={(e) =>
              setNewExperience({ ...newExperience, role: e.target.value })
            }
            placeholder="Role"
          />
          <input
            type="text"
            value={newExperience.company}
            onChange={(e) =>
              setNewExperience({ ...newExperience, company: e.target.value })
            }
            placeholder="Company"
          />
        </div>

        <div className="date-row">
          <div>
            <label>From:</label>
            <DatePicker
              selected={newExperience.duration.from}
              onChange={(date) =>
                setNewExperience({
                  ...newExperience,
                  duration: { ...newExperience.duration, from: date },
                })
              }
              dateFormat="MMM yyyy"
              showMonthYearPicker
              placeholderText="Select start month"
            />
          </div>
          <div>
            <label>To:</label>
            <DatePicker
              selected={newExperience.duration.to}
              onChange={(date) =>
                setNewExperience({
                  ...newExperience,
                  duration: { ...newExperience.duration, to: date },
                })
              }
              dateFormat="MMM yyyy"
              showMonthYearPicker
              placeholderText="Select end month"
            />
          </div>
        </div>

        <textarea
          value={newExperience.description}
          onChange={(e) =>
            setNewExperience({ ...newExperience, description: e.target.value })
          }
          placeholder="Description"
          rows={3}
        />

        <div className="tech-select">
          <label>Select Tech Stack:</label>
          <div className="tech-options">
            {techOptions.map((tech) => (
              <button
                key={tech}
                type="button"
                onClick={() => handleTechSelect(tech)}
                className={
                  newExperience.techStack.includes(tech) ? "tech-selected" : ""
                }
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {editingExperience ? (
          <button className="add-btn" onClick={handleUpdate}>
            Update Experience
          </button>
        ) : (
          <button className="add-btn" onClick={handleAddExperience}>
            + Add Experience
          </button>
        )}
      </div>
    </div>
  );
};

export default Experience;
