import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../../config";

const techOptions = [
  { value: "React", label: "React" },
  { value: "Node.js", label: "Node.js" },
  { value: "Express.js", label: "Express.js" },
  { value: "MongoDB", label: "MongoDB" },
  { value: "Firebase", label: "Firebase" },
  { value: "Next.js", label: "Next.js" },
  { value: "Tailwind CSS", label: "Tailwind CSS" },
  { value: "TypeScript", label: "TypeScript" },
  { value: "Redux", label: "Redux" },
  { value: "GSAP", label: "GSAP" },
];

const tagOptions = [
  { value: "Frontend", label: "Frontend" },
  { value: "Backend", label: "Backend" },
  { value: "Full Stack", label: "Full Stack" },
  { value: "UI/UX", label: "UI/UX" },
  { value: "Mobile App", label: "Mobile App" },
];

const ProjectForm = ({ project, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    techStack: project?.techStack || [],
    tags: project?.tags || "",
    githubLink: project?.githubLink || "",
    liveLink: project?.liveLink || "",
    additionalInfo: project?.additionalInfo || "",
  });
  const [thumbnail, setThumbnail] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTechChange = (selected) => {
    setFormData({
      ...formData,
      techStack: selected ? selected.map((opt) => opt.value) : [],
    });
  };

  const handleTagChange = (selected) => {
    setFormData({ ...formData, tags: selected?.value || "" });
  };

  const handleFileChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) =>
        data.append(k, Array.isArray(v) ? v.join(",") : v)
      );
      if (thumbnail) data.append("thumbnail", thumbnail);

      if (project) {
        await axios.put(`${BASE_URL}/api/projects/${project._id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Project updated successfully!");
      } else {
        await axios.post(`${BASE_URL}/api/projects`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Project added successfully!");
      }

      onSubmit();
    } catch (err) {
      console.error(err);
      toast.error("Error saving project");
    }
  };

  return (
    <div className="project-form-container">
      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Tech Stack:</label>
            <Select
              isMulti
              options={techOptions}
              onChange={handleTechChange}
              value={techOptions.filter((opt) =>
                formData.techStack.includes(opt.value)
              )}
            />
          </div>
          <div className="form-group">
            <label>Tags:</label>
            <Select
              options={tagOptions}
              onChange={handleTagChange}
              value={
                tagOptions.find((opt) => opt.value === formData.tags) || null
              }
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>GitHub Link:</label>
            <input
              type="url"
              name="githubLink"
              value={formData.githubLink}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Live Link:</label>
            <input
              type="url"
              name="liveLink"
              value={formData.liveLink}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Thumbnail:</label>
          <input type="file" onChange={handleFileChange} accept="image/*" />
        </div>

        <div className="form-group">
          <label>Additional Info:</label>
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
          />
        </div>

        <div className="buttons">
          <button type="submit">{project ? "Update" : "Save"}</button>
          <button type="button" className="cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
