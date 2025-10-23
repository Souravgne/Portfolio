// context.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

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

        // Fetch user details and projects in parallel
        const [userRes, projectsRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/userDetails`),
          axios.get(`${BASE_URL}/api/projects`)
        ]);

        // Update state
        setUserDetails(userRes.data);
        setProjects(projectsRes.data);

        console.log("✅ User Details:", userRes.data);
        console.log("✅ Projects:", projectsRes.data);

      } catch (err) {
        console.error("❌ Error fetching portfolio data:", err);
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
