import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Profile from "./Profile";
import Addition from "./components/Addition";
import Catalog from "./components/Catalog";
import Generate from "./components/Generate";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/addition" element={<Addition />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/generate" element={<Generate />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
