import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/art.jpg';
import './Homepage.css';

function HomePage() {
    return (
        <div className="homepage-container">
            <nav>
                <img src={logo} alt="Logo" />
                <div className="nav-links">
                <Link to="/shop" className="nav-link">Shop</Link> {/* New Shop link */}

                    <Link to="/register" className="nav-link">Register</Link>
                    <Link to="/login" className="nav-link login-link">Login</Link>
                </div>
            </nav>
            <div className="content">
                {/* <h1>Welcome to the User Registration System</h1> */}
                {/* Add other content here */}
            </div>
        </div>
    );
}

export default HomePage;
