import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css'; // Ensure this path is correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function SignIn() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

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
          <div className="password-input-container">
            <input
              type={passwordShown ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
             <button 
              type="button" 
              onClick={togglePasswordVisibility} 
              className="password-toggle-button"
              aria-label="Toggle password visibility"
            >
              <FontAwesomeIcon icon={passwordShown ? faEyeSlash : faEye} />
            </button>
          </div>
          <button type="submit" className="signin-button">Sign In</button>
          <p className="signup-option">
            Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
