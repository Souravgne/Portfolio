// context.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const Context = createContext();

export const usePortfolio = () => useContext(Context);

export const DataProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [projectsRes, skillsRes, userRes] = await Promise.all([
          // axios.get(`${process.env.REACT_APP_BASE_URL}/api/projects`),
          // axios.get(`${process.env.REACT_APP_BASE_URL}/api/skills`),
          axios.get(`http://localhost:5000/api/userDetails/all`),
        ]);

        // setProjects(projectsRes.data);
        // setSkills(skillsRes.data);
        setUserDetails(userRes.data);
        console.log("User Details:", userDetails);
      } catch (err) {
        console.error("Error fetching portfolio data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const value = {
    projects,
    setProjects,
    skills,
    setSkills,
    userDetails,
    setUserDetails,
    loading,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
