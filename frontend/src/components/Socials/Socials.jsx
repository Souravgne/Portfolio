import React, { useState } from "react";
import "./Socials.scss";

const Socials = () => {
  const [socials, setSocials] = useState([
    {
      id: 1,
      name: "LinkedIn",
      link: "https://linkedin.com/in/username",
      thumbnail: null,
    },
    {
      id: 2,
      name: "GitHub",
      link: "https://github.com/username",
      thumbnail: null,
    },
  ]);

  const [newSocial, setNewSocial] = useState({
    name: "",
    link: "",
    thumbnail: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSocial((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewSocial((prev) => ({ ...prev, thumbnail: e.target.files[0] }));
  };

  const handleAddSocial = () => {
    if (!newSocial.name || !newSocial.link) return;
    setSocials([...socials, { ...newSocial, id: Date.now() }]);
    setNewSocial({ name: "", link: "", thumbnail: null });
  };

  const handleDelete = (id) => {
    setSocials(socials.filter((s) => s.id !== id));
  };

  return (
    <div className="socials-container">
      <h2>Social Accounts</h2>

      <div className="social-list">
        {socials.map((social) => (
          <div key={social.id} className="social-card">
            <div className="social-info">
              {social.thumbnail && (
                <img
                  src={URL.createObjectURL(social.thumbnail)}
                  alt={social.name}
                />
              )}
              <div>
                <p className="social-name">{social.name}</p>
                <a
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  {social.link}
                </a>
              </div>
            </div>
            <button
              className="delete-btn"
              onClick={() => handleDelete(social.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Add New Social */}
      <div className="add-social">
        <h3>Add New Social Account</h3>
        <div className="input-row">
          <input
            type="text"
            name="name"
            value={newSocial.name}
            onChange={handleChange}
            placeholder="Social Media Name"
          />
          <input
            type="url"
            name="link"
            value={newSocial.link}
            onChange={handleChange}
            placeholder="Profile Link"
          />
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <button className="add-btn" onClick={handleAddSocial}>
          + Add Social
        </button>
      </div>
    </div>
  );
};

export default Socials;
