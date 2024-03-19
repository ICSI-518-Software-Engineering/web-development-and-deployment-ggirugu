import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Profile from "./Profile";
import Addition from "./components/Addition";
import Catalog from "./components/Catalog"; // Import the Catalog component
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import your custom CSS file for App styling

function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-container"> {/* Wrap everything in a container div */}
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/addition" element={<Addition />} />
          <Route path="/catalog" element={<Catalog />} /> {/* Add this route for the Catalog component */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
