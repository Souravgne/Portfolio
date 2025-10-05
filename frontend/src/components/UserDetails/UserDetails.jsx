import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./UserDetails.scss";

const UserDetails = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BASE_URL}/api/userDetails`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData(res.data);
      } catch (err) {
        console.log("No existing details found");
      }
    };
    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "resume") setResumeFile(files[0]);
    if (name === "profileImage") setProfileImage(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, value)
      );
      if (resumeFile) data.append("resume", resumeFile);
      if (profileImage) data.append("profileImage", profileImage);

      await axios.post(`${BASE_URL}/api/userDetails`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("User details saved successfully!");
    } catch (err) {
      toast.error("Failed to save user details.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-details-form">
      <div className="form-group">
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
        />
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="form-group">
        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
        />
      </div>

      <div className="form-group">
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter your address"
        />
      </div>

      <div className="form-group">
        <label>Bio:</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Write something about yourself"
        />
      </div>

      <div className="form-group">
        <label>Profile Image:</label>
        <input
          type="file"
          name="profileImage"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <div className="form-group">
        <label>Resume:</label>
        <input
          type="file"
          name="resume"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />
      </div>

      <button type="submit">Save</button>
    </form>
  );
};

export default UserDetails;
