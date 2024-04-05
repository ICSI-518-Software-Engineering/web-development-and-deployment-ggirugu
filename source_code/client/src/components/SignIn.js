// SignIn.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform your sign-in logic here
    if (username === 'testuser' && password === 'password') { // Replace with actual validation
      localStorage.setItem('userToken', 'yourToken'); // Set the token upon successful login
      navigate('/profile'); // Navigate to the profile page upon successful login
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'purple' }}>
      <div style={{ padding: 20, borderRadius: 10, background: 'white', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h2>Welcome!</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            style={{ margin: '10px 0', padding: '10px' }}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{ margin: '10px 0', padding: '10px' }}
          />
          <button type="submit" style={{ padding: '10px', background: 'orange', color: 'white', border: 'none', borderRadius: 5 }}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
