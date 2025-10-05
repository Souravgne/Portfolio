import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "../index";
import UserDetails from "../UserDetails/UserDetails";
import About from "../About/About";
import Experience from "../Experience/Experience";
import Skills from "../Skills/Skills";
import Socials from "../Socials/Socials";
import Projects from "../Projects/Projects";

import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <div className="app__dashboard">
      <Navbar />

      <div
        className="app__dashboard-content"
        style={{ marginTop: "80px", padding: "2rem" }}
      >
        <Routes>
          <Route path="details" element={<UserDetails />} />
          <Route path="about" element={<About />} />
          <Route path="experience" element={<Experience />} />
          <Route path="skills" element={<Skills />} />
          <Route path="socials" element={<Socials />} />
          <Route path="projects" element={<Projects />} />
          <Route path="*" element={<UserDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
