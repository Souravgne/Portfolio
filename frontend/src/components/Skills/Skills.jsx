import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Skills.scss";
import { BASE_URL } from './../../config';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: "", thumbnail: null });
  const [editingSkill, setEditingSkill] = useState(null);

  // Fetch skills on load
  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/skills`);
      setSkills(res.data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSkill((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewSkill((prev) => ({ ...prev, thumbnail: e.target.files[0] }));
  };

  // CREATE
  const handleAddSkill = async () => {
    if (!newSkill.name) return;

    const formData = new FormData();
    formData.append("name", newSkill.name);
    if (newSkill.thumbnail) formData.append("thumbnail", newSkill.thumbnail);
    console.log("Submitting new skill:", newSkill);
    try {
      const res = await axios.post(`${BASE_URL}/api/skills`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSkills([...skills, res.data]);
      setNewSkill({ name: "", thumbnail: null });
    } catch (error) {
      console.error("Error creating skill:", error);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/skills/${id}`);
      setSkills(skills.filter((s) => s._id !== id));
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  // EDIT
  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setNewSkill({ name: skill.name, thumbnail: null });
  };

  // UPDATE
  const handleUpdate = async () => {
    if (!editingSkill) return;

    const formData = new FormData();
    formData.append("name", newSkill.name);
    if (newSkill.thumbnail) formData.append("thumbnail", newSkill.thumbnail);

    try {
      const res = await axios.put(
        `${BASE_URL}/api/skills/${editingSkill._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setSkills(skills.map((s) => (s._id === res.data._id ? res.data : s)));
      setEditingSkill(null);
      setNewSkill({ name: "", thumbnail: null });
    } catch (error) {
      console.error("Error updating skill:", error);
    }
  };

  return (
    <div className="skills-container">
      <h2>Skills</h2>

      {/* Existing skills */}
      <div className="skills-grid">
        {skills.map((skill) => (
          <div key={skill._id} className="skill-card">
            <div className="skill-info">
              {skill.thumbnail ? (
                <img
                  src={`${BASE_URL}${skill.thumbnail}`}
                  alt={skill.name}
                  className="skill-thumb"
                />
              ) : (
                <div className="thumbnail-placeholder">No Image</div>
              )}
              <p>{skill.name}</p>
            </div>
            <div className="actions">
              <button onClick={() => handleEdit(skill)}>Edit</button>
              <button onClick={() => handleDelete(skill._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Form */}
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
          <button onClick={handleUpdate}>Update Skill</button>
        ) : (
          <button onClick={handleAddSkill}>+ Add Skill</button>
        )}
      </div>
    </div>
  );
};

export default Skills;
