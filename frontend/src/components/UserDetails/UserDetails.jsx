import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./UserDetails.scss";
import { usePortfolio } from "../../context/context";
import { BASE_URL } from "../../config";


const UserDetails = () => {
  const { userDetails, loading } = usePortfolio();

  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({});
  const [resumeFile, setResumeFile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Reference to hidden file input for profile image
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!loading && userDetails) {
      setFormData(userDetails);
      setPreviewImage(`${BASE_URL}${userDetails.profileImage}`);
    }
  }, [loading, userDetails]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (name === "resume") setResumeFile(file);
    if (name === "profileImage") {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleImageClick = () => {
    if (editable && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      if (resumeFile) data.append("resume", resumeFile);
      if (profileImage) data.append("profileImage", profileImage);

      await axios.post(`${BASE_URL}/api/userDetails`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("User details saved successfully!");
      setEditable(false);
    } catch (err) {
      toast.error("Failed to save user details.");
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="user-details-wrapper">
      <h2>User Details</h2>

      <div className="user-details-container">
        {/* Card Wrapper */}
        <div className="user-details-card">
          
          <form onSubmit={handleSubmit} className="user-details-form">
            <div className="form-group">
              <label>Full Name:</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName || ""}
                onChange={handleChange}
                disabled={!editable}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                disabled={!editable}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone:</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
                disabled={!editable}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                disabled={!editable}
                placeholder="Enter your address"
              />
            </div>

            <div className="form-group">
              <label>Bio:</label>
              <textarea
                name="bio"
                value={formData.bio || ""}
                onChange={handleChange}
                disabled={!editable}
                placeholder="Write something about yourself"
              />
            </div>

           

            {/* Save button (only in edit mode) */}
            {editable && (
              <button type="submit" className="form-button">
                Save
              </button>
            )}
          </form>

          {/* Edit Button (only when not editing) */}
          {!editable && (
            <button
              type="button"
              className="form-button edit-button"
              onClick={() => setEditable(true)}
            >
              Edit
            </button>
          )}
        </div>

        {/* Image Preview */}
        <div className="image-preview">
          {previewImage && (
            <>
              <img
                src={previewImage}
                alt="Profile Preview"
                className={`profile-preview ${editable ? "clickable" : ""}`}
                onClick={handleImageClick}
              />
              {editable && (
                <input
                  type="file"
                  name="profileImage"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              )}
              {!editable && formData.resume && (
  <a
    href={`${BASE_URL}${formData.resume}`}
    target="_blank"
    rel="noreferrer"
    className="form-button resume-button"
  >
    View Resume
  </a>
)}

            </>
          )}
        </div>
     

      </div>
    </div>
  );
};

export default UserDetails;
