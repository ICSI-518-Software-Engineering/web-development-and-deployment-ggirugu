import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'; // Ensure this CSS file is in your project directory

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

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
                        <li className="nav-item" style={{ marginLeft: '10px' }}>
                            <NavLink className="nav-link" to="/addition" activeClassName="active">Addition</NavLink>
                        </li>
                        <li className="nav-item" style={{ marginLeft: '10px' }}>
                            <NavLink className="nav-link" to="/catalog" activeClassName="active">Catalog</NavLink>
                        </li>
                        <li className="nav-item" style={{ marginLeft: '10px' }}>
                            <NavLink className="nav-link" to="/generate" activeClassName="active">Search</NavLink>
                        </li>
                        <li className="nav-item dropdown ms-auto"> {/* ms-auto will push the dropdown to the rightmost side */}
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" onClick={toggleDropdown} data-bs-toggle="dropdown" aria-expanded={isDropdownOpen}>
                                <img src="https://via.placeholder.com/30" alt="Avatar" style={{ height: '30px', borderRadius: '50%' }} /> {/* Placeholder image for avatar */}
                            </a>
                            <ul className={`dropdown-menu dropdown-menu-end ${isDropdownOpen ? 'show' : ''}`} aria-labelledby="navbarDropdown">
                                <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
