import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css'; // Ensure this path is correct

function SignIn() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentId, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem('userData', JSON.stringify(data)); // Storing user data
        localStorage.setItem('userToken', data.token); // Store token here, assuming it is part of the response
        navigate('/profile'); // Navigate to the profile page
      } else {
        alert(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('SignIn error:', error);
      alert('An error occurred while signing in');
    }
  };


  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Student ID"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit" className="signin-button">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
