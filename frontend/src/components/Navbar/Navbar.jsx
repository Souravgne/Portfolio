import React, { useState } from "react";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";

import { images } from "../../constants";
import "./Navbar.scss";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const location = useLocation();

  const isDashboard = location.pathname.startsWith("/dashboard");

  const menuItems = isDashboard
    ? ["details", "projects", "experience", "skills", "socials"]
    : ["home", "about", "work", "skills", "contact"];

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <img src={images.logo} alt="logo" />
      </div>

      <ul className="app__navbar-links">
        {menuItems.map((item) => (
          <li className="app__flex p-text" key={`link-${item}`}>
            <div />
            {isDashboard ? (
              <Link to={`/dashboard/${item}`}>{item}</Link>
            ) : (
              <a href={`#${item}`}>{item}</a>
            )}
          </li>
        ))}
      </ul>

      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />

        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <HiX onClick={() => setToggle(false)} />
            <ul>
              {menuItems.map((item) => (
                <li key={item}>
                  {isDashboard ? (
                    <Link
                      to={`/dashboard/${item}`}
                      onClick={() => setToggle(false)}
                    >
                      {item}
                    </Link>
                  ) : (
                    <a href={`#${item}`} onClick={() => setToggle(false)}>
                      {item}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
