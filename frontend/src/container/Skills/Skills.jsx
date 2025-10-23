import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";

import { AppWrap, MotionWrap } from "../../wrapper";
// import { urlFor, client } from "../../client"; // Commented out for dummy data
import "./Skills.scss";

const Skills = () => {
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    // ✅ Dummy Skills Data
    const dummySkills = [
      {
        name: "JavaScript",
        bgColor: "#F7DF1E",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: "React",
        bgColor: "#61DBFB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "Node.js",
        bgColor: "#68A063",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      {
        name: "Python",
        bgColor: "#3776AB",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
    ];

    // ✅ Dummy Experiences Data
    const dummyExperiences = [
      {
        year: "2024",
        works: [
          {
            name: "Frontend Developer",
            company: "TechWave",
            desc: "Developed responsive web apps using React and Tailwind CSS.",
          },
          {
            name: "UI Engineer",
            company: "Pixel Studios",
            desc: "Implemented motion design and UI animations with Framer Motion.",
          },
        ],
      },
      {
        year: "2023",
        works: [
          {
            name: "Backend Developer",
            company: "CodeBase Ltd.",
            desc: "Built scalable REST APIs using Node.js and MongoDB.",
          },
        ],
      },
    ];

    // Set dummy data
    setSkills(dummySkills);
    setExperiences(dummyExperiences);

    // ❌ Commented out Sanity fetching
    /*
    const query = '*[_type == "experiences"]';
    const skillsQuery = '*[_type == "skills"]';

    client.fetch(query).then(setExperiences);
    client.fetch(skillsQuery).then(setSkills);
    */
  }, []);

  return (
    <>
      <h2 className="head-text">Skills & Experiences</h2>

      <div className="app__skills-container">
        {/* Skills List */}
        <motion.div className="app__skills-list">
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
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
          ))}
        </motion.div>

        {/* Experiences */}
        <div className="app__skills-exp">
          {experiences.map((experience) => (
            <motion.div className="app__skills-exp-item" key={experience.year}>
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
          ))}
        </div>

        {/* Global Tooltip */}
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
