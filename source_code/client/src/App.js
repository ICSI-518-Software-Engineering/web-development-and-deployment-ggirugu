import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar"; // Assuming you have a Navbar component
import Profile from "./Profile";
import Addition from "./components/Addition";
import Catalog from "./components/Catalog";
import Generate from "./components/Generate";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp.js";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const isAuthenticated = () => {
    // Replace this with your actual logic to verify if the user is authenticated
    return localStorage.getItem("userToken") ? true : false;
  };

  const RequireAuth = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/" replace />;
  };

  // A layout component for pages that include the Navbar
  const Layout = ({ children }) => {
    return (
      <>
        <Navbar />
        <div>{children}</div>
      </>
    );
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          {/* Protected routes with Navbar */}
          <Route path="/profile" element={
            <RequireAuth>
              <Layout>
                <Profile />
              </Layout>
            </RequireAuth>
          } />
          <Route path="/addition" element={
            <RequireAuth>
              <Layout>
                <Addition />
              </Layout>
            </RequireAuth>
          } />
          <Route path="/catalog" element={
            <RequireAuth>
              <Layout>
                <Catalog />
              </Layout>
            </RequireAuth>
          } />
          <Route path="/generate" element={
            <RequireAuth>
              <Layout>
                <Generate />
              </Layout>
            </RequireAuth>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
