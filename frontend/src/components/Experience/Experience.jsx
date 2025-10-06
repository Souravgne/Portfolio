import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Experience.scss";

const Experience = () => {
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      role: "",
      company: "",
      duration: { from: new Date("2023-01-01"), to: new Date() },
      description: "",
      techStack: [],
    },
  ]);

  const [newExperience, setNewExperience] = useState({
    role: "",
    company: "",
    duration: { from: null, to: null },
    description: "",
    techStack: [],
  });

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

  const handleTechSelect = (tech) => {
    setNewExperience((prev) => ({
      ...prev,
      techStack: prev.techStack.includes(tech)
        ? prev.techStack.filter((t) => t !== tech)
        : [...prev.techStack, tech],
    }));
  };

  const handleEditChange = (id, field, value) => {
    setExperiences((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const handleAddExperience = () => {
    if (!newExperience.role || !newExperience.company) return;
    setExperiences([...experiences, { ...newExperience, id: Date.now() }]);
    setNewExperience({
      role: "",
      company: "",
      duration: { from: null, to: null },
      description: "",
      techStack: [],
    });
  };

  const handleDelete = (id) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  return (
    <div className="experience-container">
      <h2>Experience</h2>

      {/* Saved Experiences */}
      <div className="experience-list">
        {experiences.map((exp) => (
          <div key={exp.id} className="experience-card">
            <div className="input-row">
              <input
                type="text"
                value={exp.role}
                onChange={(e) =>
                  handleEditChange(exp.id, "role", e.target.value)
                }
                placeholder="Role"
              />
              <input
                type="text"
                value={exp.company}
                onChange={(e) =>
                  handleEditChange(exp.id, "company", e.target.value)
                }
                placeholder="Company"
              />
            </div>

            <div className="date-row">
              <div>
                <label>From:</label>
                <DatePicker
                  selected={exp.duration.from}
                  onChange={(date) =>
                    handleEditChange(exp.id, "duration", {
                      ...exp.duration,
                      from: date,
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
                  selected={exp.duration.to}
                  onChange={(date) =>
                    handleEditChange(exp.id, "duration", {
                      ...exp.duration,
                      to: date,
                    })
                  }
                  dateFormat="MMM yyyy"
                  showMonthYearPicker
                  placeholderText="Select end month"
                />
              </div>
            </div>

            <textarea
              value={exp.description}
              onChange={(e) =>
                handleEditChange(exp.id, "description", e.target.value)
              }
              placeholder="Description"
              rows={3}
            />

            <div className="tech-stack-display">
              {exp.techStack.map((tech, i) => (
                <span key={i}>{tech}</span>
              ))}
            </div>

            <button className="delete-btn" onClick={() => handleDelete(exp.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Add New Experience */}
      <div className="add-experience">
        <h3>Add New Experience</h3>
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

        <button className="add-btn" onClick={handleAddExperience}>
          + Add Experience
        </button>
      </div>
    </div>
  );
};

export default Experience;
