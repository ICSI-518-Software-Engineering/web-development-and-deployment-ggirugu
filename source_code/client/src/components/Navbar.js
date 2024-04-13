import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'; // Import the custom CSS

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});

    useEffect(() => {
        // Retrieve user data from local storage
        const storedUserData = JSON.parse(localStorage.getItem('userData'));
        if (storedUserData) {
            setUserData(storedUserData);
        }
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        localStorage.clear(); // Clears all the user info from local storage
        navigate('/'); // Redirects to the signin page
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-custom">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src="/logo.jpg" alt="Logo" style={{ height: '30px', marginRight: '10px' }} />
                    MyProfileApp
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                            <NavLink className="nav-link" to="/profile" activeClassName="active">Profile</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/addition" activeClassName="active">Addition</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/catalog" activeClassName="active">Catalog</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/generate" activeClassName="active">Search</NavLink>
                        </li>

                        {/* other nav links */}
                        {/* Dropdown menu for user details */}
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" onClick={toggleDropdown} data-bs-toggle="dropdown" aria-expanded={isDropdownOpen.toString()}>
                                <img src={userData.avatar || process.env.PUBLIC_URL + '/avatar.jpg'} alt="Avatar" style={{ height: '30px', borderRadius: '50%' }} />
                            </a>
                            <div className={`dropdown-menu dropdown-menu-right ${isDropdownOpen ? 'show' : ''}`} aria-labelledby="navbarDropdown">
                                <div className="dropdown-item"><span className="icon-placeholder">👤</span>Name: {userData.studentName}</div>
                                <div className="dropdown-item"><span className="icon-placeholder">📧</span>Email: {userData.email}</div>
                                <div className="dropdown-item"><span className="icon-placeholder">🆔</span>Student ID: {userData.studentId}</div>
                                <div className="dropdown-item" onClick={handleLogout}><span className="icon-placeholder">🚪</span>Logout</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
