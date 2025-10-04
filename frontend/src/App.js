import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { About, Footer, Header, Skills, Testimonial, Work } from "./container";
import { Navbar } from "./components";
import Admin from "./components/Admin/Admin";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.scss";
import { Toaster } from 'react-hot-toast';



const MainApp = () => (
  <>
    <Navbar />
    <Header />
    <About />
    <Work />
    <Skills />
    <Testimonial />
    <Footer />
  </>
);

const App = () => (
  <Router>
      <Toaster position="top-center" reverseOrder={false} />
    <Routes>
      <Route path="/admin" element={<Admin/>} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/*" element={<MainApp />} />
    </Routes>
  </Router>
);

export default App;
