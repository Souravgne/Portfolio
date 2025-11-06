import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Socials.scss";
import { BASE_URL } from './../../config';

const Socials = () => {
  const [socials, setSocials] = useState([]);
  const [newSocial, setNewSocial] = useState({
    name: "",
    link: "",
    thumbnail: null,
  });

  // ✅ Fetch socials from API on mount
  useEffect(() => {
    const fetchSocials = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/socials`);
        setSocials(res.data);
      } catch (err) {
        console.error("Error fetching socials:", err);
      }
    };

    fetchSocials();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSocial((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setNewSocial((prev) => ({ ...prev, thumbnail: e.target.files[0] }));
  };

  // ✅ Add social to backend
 const handleAddSocial = async () => {
  if (!newSocial.name || !newSocial.link) return;

  try {
    const res = await axios.post(`${BASE_URL}/api/socials`, {
      name: newSocial.name,
      link: newSocial.link,
      thumbnail: null, // or a placeholder URL
    });

    setSocials((prev) => [...prev, res.data]);
    setNewSocial({ name: "", link: "", thumbnail: null });
  } catch (err) {
    console.error("Error adding social:", err);
  }
};


  // ✅ Delete social from backend
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/socials/${id}`);
      setSocials((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Error deleting social:", err);
    }
  };

  return (
    <div className="socials-container">
      <h2>Social Accounts</h2>

      <div className="social-list">
        {socials.length === 0 && <p>No socials available.</p>}
        {socials.map((social) => (
          <div key={social._id} className="social-card">
            <div className="social-info">
              {social.thumbnail && (
                <img
                  src={
                    typeof social.thumbnail === "string"
                      ? `${BASE_URL}${social.thumbnail}`
                      : URL.createObjectURL(social.thumbnail)
                  }
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
              onClick={() => handleDelete(social._id)}
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
