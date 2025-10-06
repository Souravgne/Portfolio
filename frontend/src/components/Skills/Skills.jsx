import React, { useState } from "react";
import "./Skills.scss";

const Skills = () => {
  const [skills, setSkills] = useState([
    { id: 1, name: "React", thumbnail: null },
    { id: 2, name: "Node.js", thumbnail: null },
  ]);

  const [newSkill, setNewSkill] = useState({ name: "", thumbnail: null });
  const [editingSkill, setEditingSkill] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSkill((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewSkill((prev) => ({ ...prev, thumbnail: e.target.files[0] }));
  };

  const handleAddSkill = () => {
    if (!newSkill.name) return;
    setSkills([...skills, { ...newSkill, id: Date.now() }]);
    setNewSkill({ name: "", thumbnail: null });
  };

  const handleDelete = (id) => {
    setSkills(skills.filter((s) => s.id !== id));
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setNewSkill({ name: skill.name, thumbnail: skill.thumbnail });
  };

  const handleUpdate = () => {
    if (!editingSkill) return;
    setSkills(
      skills.map((s) =>
        s.id === editingSkill.id ? { ...editingSkill, ...newSkill } : s
      )
    );
    setEditingSkill(null);
    setNewSkill({ name: "", thumbnail: null });
  };

  return (
    <div className="skills-container">
      <h2>Skills</h2>

      {/* Render existing skills */}
      <div className="skills-grid">
        {skills.map((skill) => (
          <div key={skill.id} className="skill-card">
            <div className="skill-info">
              {skill.thumbnail ? (
                <img
                  src={URL.createObjectURL(skill.thumbnail)}
                  alt={skill.name}
                />
              ) : (
                <div className="thumbnail-placeholder">No Image</div>
              )}
              <p>{skill.name}</p>
            </div>
            <div className="actions">
              <button className="edit-btn" onClick={() => handleEdit(skill)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(skill.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Skill Form */}
      <div className="add-skill">
        <h3>{editingSkill ? "Edit Skill" : "Add New Skill"}</h3>
        <div className="input-row">
          <input
            type="text"
            name="name"
            value={newSkill.name}
            onChange={handleChange}
            placeholder="Skill Name"
          />
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        {editingSkill ? (
          <button className="update-btn" onClick={handleUpdate}>
            Update Skill
          </button>
        ) : (
          <button className="add-btn" onClick={handleAddSkill}>
            + Add Skill
          </button>
        )}
      </div>
    </div>
  );
};

export default Skills;
