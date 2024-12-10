import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu'; 
import { Menu, MenuItem, IconButton } from '@mui/material'; 
import '../styles/AdminNavbar.css';
import { clearSession, getSession } from '../utils/cookieUtils'; // Import cookie utilities

const AdminNavbar = () => {
  const [anchorEl, setAnchorEl] = useState(null); // State to manage the dropdown
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the userId cookie exists on load
    if (!getSession('userId')) {
        navigate('/login'); // Redirect if the cookie is missing
    }
}, [navigate]);

const handleLogout = () => {
    sessionStorage.clear(); // Clear session storage if needed
    clearSession('userId'); // Clear userId cookie

    navigate('/');
};
  // Function to open the dropdown menu
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
          <Link to="/add-art" className="menu-link">Add Art</Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link to="/view-art" className="menu-link">View Art</Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link to="/view-all-users" className="menu-link">View All Users</Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Link className="menu-link">Logout</Link>
        </MenuItem>
      </Menu>
    </nav>
  );
};

export default AdminNavbar;
