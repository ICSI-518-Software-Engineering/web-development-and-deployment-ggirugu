// SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform your sign-up logic here, e.g., sending data to a server
    // For now, let's just log the new user and redirect to sign-in
    console.log(`New user created: ${username}, ${email}`);
    navigate('/'); // Navigate to the sign-in page after signing up
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'purple' }}>
      <div style={{ padding: 20, borderRadius: 10, background: 'white', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            style={{ margin: '10px 0', padding: '10px' }}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
