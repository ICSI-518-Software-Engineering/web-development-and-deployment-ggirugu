import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'; // Make sure this path is correct

function SignUp() {
    const [studentName, setStudentName] = useState('');
    const [studentId, setStudentId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const isPasswordValid = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isPasswordValid(password)) {
            alert('Password must be at least 8 characters and include at least one letter, one number, and one special character.');
            return;
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    studentName,
                    studentId,
                    email,
                    password
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('User registered:', data);
                // Handle successful registration here, e.g., navigate to another route or show success message
                navigate('/'); // Example: Navigate to the sign-in page
            } else {
                alert(data.message || 'Failed to sign up.');
            }
        } catch (error) {
            console.error('SignUp error:', error);
            alert('An error occurred during sign up.');
        }
    };


    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Student Name" required />
                    <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="Student ID" required />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                    <div className="password-input-container">
                        <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="toggle-password-visibility">{showPassword ? 'Hide' : 'Show'}</button>
                    </div>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required />
                    <button type="submit" className="signup-submit-button">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
