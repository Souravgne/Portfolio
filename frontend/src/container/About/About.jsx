import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import './About.scss';
import { urlFor, client } from '../../client';

const About = () => {
  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
  const dummyData = [
    {
      title: 'Web Design',
      description: 'Creating visually appealing and user-friendly website layouts.',
      imgUrl: 'https://img.freepik.com/free-photo/web-design-technology-browsing-programming-concept_53876-163260.jpg?semt=ais_hybrid&w=740&q=80',
    },
    {
      title: 'UI/UX',
      description: 'Designing intuitive user experiences and interfaces.',
      imgUrl: 'https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg?semt=ais_hybrid&w=740&q=80',
    },
    {
      title: 'Frontend Development',
      description: 'Building responsive and interactive web applications.',
      imgUrl: 'https://media.licdn.com/dms/image/v2/D5612AQFfhTEictqBHA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1721174916441?e=2147483647&v=beta&t=IqnGNJxS4J-yaL4rgLBlx-cbNAbFwpEMCRvkkLXsR48',
    },
    {
      title: 'Branding',
      description: 'Crafting consistent brand identities across platforms.',
      imgUrl: 'https://img.freepik.com/free-photo/online-marketing-branding-concept-laptop-screen_53876-94880.jpg?semt=ais_hybrid&w=740&q=80',
    },
  ];

  // Simulate async fetch
  setTimeout(() => {
    setAbouts(dummyData);
  }, 500);
}, []);


  return (
    <>
      <h2 className="head-text">I Know that <span>Good Design</span> <br />means  <span>Good Business</span></h2>

      <div className="app__profiles">
        {abouts.map((about, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: 'tween' }}
            className="app__profile-item"
            key={about.title + index}
          >
            <img src={about.imgUrl} alt={about.title} />
            <h2 className="bold-text" style={{ marginTop: 20 }}>{about.title}</h2>
            <p className="p-text" style={{ marginTop: 10 }}>{about.description}</p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(About, 'app__about'),
  'about',
  'app__whitebg',
);
