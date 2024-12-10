import React from 'react';
import logo from '../images/art.jpg'; // Import the image

export default function UserIndex() {
  return (
    <div>
      {/* Navbar */}
      <nav style={{ backgroundColor: 'black', padding: '10px', height: '40px', display: 'flex', alignItems: 'center' }}>
        {/* Logo */}
        <img src={logo} alt="Logo" style={{ height: '140%', maxHeight: '60px', marginLeft: '0px' }} />
        
        {/* Additional navbar content */}
        {/* You can add more items like links here */}
      </nav>

      <div>
        <h2>UserIndex</h2>
      </div>
    </div>
  );
}
