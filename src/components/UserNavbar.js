import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { clearSession, getSession } from '../utils/cookieUtils'; // Import the clearSession function
import '../styles/AdminNavbar.css';

const UserNavbar = () => {
  const [anchorEl, setAnchorEl] = useState(null); // State to manage the dropdown
  const navigate = useNavigate(); // Use navigate to redirect on logout

  useEffect(() => {
    // Check if the userId cookie exists on load
    if (!getSession('userId')) {
      navigate('/login'); // Redirect if the cookie is missing
    }
  }, [navigate]);

  // Function to open the dropdown menu
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to close the dropdown menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Logout function to clear session and redirect to login
  const handleLogout = () => {
    sessionStorage.clear(); // Clear session storage if needed
    clearSession('userId'); // Clear the userId cookie or session
    navigate('/'); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <IconButton
        edge="end"
        color="inherit"
        aria-controls="menu"
        aria-haspopup="true"
        onClick={handleMenuClick}
        className="menu-icon"
        style={{ marginRight: '20px' }}
      >
        <MenuIcon fontSize="large" />
      </IconButton>

      {/* Dropdown menu */}
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Link to="/cart" className="menu-link">Cart</Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link to="/userviewarts" className="menu-link">View Art</Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link to="/wishlist" className="menu-link">Wishlist</Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link to="/profileupdate" className="menu-link">Profile Update</Link>
        </MenuItem>
        <MenuItem onClick={() => { handleLogout(); handleMenuClose(); }}>
          Logout
        </MenuItem>
      </Menu>
    </nav>
  );
};

export default UserNavbar;
