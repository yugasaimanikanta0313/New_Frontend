// ProfileUpdate.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userProfileUpdate } from '../services/api'; // Import the API function to update the user profile

const ProfileUpdate = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (profilePic) {
      formData.append('file', profilePic);
    }

    try {
      await userProfileUpdate(formData); // Call the API function to update the profile
      alert('Profile updated successfully!');
      navigate('/'); // Navigate back to the home page or another desired route
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="profile-update-container">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Profile Picture:</label>
          <input
            type="file"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileUpdate;
