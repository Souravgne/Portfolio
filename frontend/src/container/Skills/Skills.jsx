import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import axios from "axios";

import { AppWrap, MotionWrap } from "../../wrapper";
import "./Skills.scss";
import { BASE_URL } from './../../config';


const Skills = () => {
  const [experiences, setExperiences] = useState([]); // keep for future use
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    // Fetch skills from backend API
    const fetchSkills = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/skills`);
        // Transform if necessary (depending on backend structure)
        const formatted = res.data.map((skill) => ({
          _id: skill._id,
          name: skill.name,
          icon: skill.thumbnail
            ? `${BASE_URL}${skill.thumbnail}`
            : "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/code/code-original.svg", // fallback
          bgColor: "#edf2f8", // default background color
        }));
        setSkills(formatted);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);

  return (
    <>
      <h2 className="head-text">Skills & Experiences</h2>

      <div className="app__skills-container">
        {/* ✅ Skills List */}
        <motion.div className="app__skills-list">
          {skills.length === 0 ? (
            <p className="p-text">Loading skills...</p>
          ) : (
            skills.map((skill) => (
              <motion.div
                key={skill._id || skill.name}
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.5 }}
                className="app__skills-item app__flex"
              >
                <div
                  className="app__flex"
                  style={{ backgroundColor: skill.bgColor }}
                >
                  <img src={skill.icon} alt={skill.name} />
                </div>
                <p className="p-text">{skill.name}</p>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* ✅ Placeholder for Experiences (you can later fetch real ones) */}
        <div className="app__skills-exp">
          {experiences.length === 0 ? (
            <p className="p-text">No experiences yet</p>
          ) : (
            experiences.map((experience) => (
              <motion.div
                className="app__skills-exp-item"
                key={experience.year}
              >
                <div className="app__skills-exp-year">
                  <p className="bold-text">{experience.year}</p>
                </div>
                <motion.div className="app__skills-exp-works">
                  {experience.works.map((work) => (
                    <motion.div
                      key={work.name}
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work"
                      data-tooltip-id={work.name}
                      data-tooltip-content={work.desc}
                    >
                      <h4 className="bold-text">{work.name}</h4>
                      <p className="p-text">{work.company}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))
          )}
        </div>

        {/* Tooltip */}
        <Tooltip id="tooltip" className="skills-tooltip" />
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "app__whitebg"
);
