import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { BASE_URL } from './../../config';
import { useNavigate } from 'react-router-dom';
import { AppWrap } from '../../wrapper';
import './Admin.scss';

const Admin = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const res = await axios.post(`${BASE_URL}/api/auth/login`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    localStorage.setItem('token', res.data.token);
    toast.success('Login successful!');
    navigate('/dashboard');
  } catch (err) {
    const msg = err.response?.data?.message || 'Login failed';
    setError(msg);
    toast.error(msg);
  }
};


  return (
    <motion.div
      className="app__login app__flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="app__login-container"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <h2 className="head-text">Admin Login</h2>
        <form onSubmit={handleSubmit} className="app__login-form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="p-text">Login</button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AppWrap(Admin, 'admin');
