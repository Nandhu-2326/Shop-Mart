import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./Admin";
import Home from "./Home";
import AdminDetails from "./AdminDetails";

const RounterPage = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="AdminDetails" element={<AdminDetails />} />
        </Routes>
      </Router>
    </>
  );
};

export default RounterPage;
