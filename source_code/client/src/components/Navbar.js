import React from "react";
import { Link, NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'; // Make sure you create a Navbar.css file in the same directory as your Navbar component

const Navbar = () => {
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
                            <NavLink className="nav-link" to="/" activeClassName="active">Profile</NavLink>
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
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
