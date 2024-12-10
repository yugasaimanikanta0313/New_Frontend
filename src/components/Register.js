import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaCamera } from 'react-icons/fa';
import { Button, CircularProgress } from '@mui/material';
import { registerUser } from '../services/api'; // Import the registerUser function

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [profilePic, setProfilePic] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(''); // Clear error message on input change
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    if (profilePic) {
      data.append('profilePic', profilePic);
    }

    try {
      const response = await registerUser(data); // Use the registerUser function from api.js
      console.log(response);
      setSuccessMessage('Registration successful! Redirecting...');
      setTimeout(() => {
        navigate('/verify');
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message || 'Registration failed. Please check your details or try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css?family=Roboto:400,700');
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Roboto', sans-serif;
          }

          body {
            background-color: #000;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }

          .container {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
          }

          .screen {
            position: relative;
            background: #1a1a1a;
            width: 400px;
            padding: 50px;
            border-radius: 15px;
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.6), 0 0 50px rgba(0, 255, 255, 0.3);
            overflow: hidden;
          }

          .screen::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: inherit;
            box-shadow: 0 0 50px rgba(0, 255, 255, 0.3), 0 0 100px rgba(0, 255, 255, 0.2);
            pointer-events: none;
          }

          .screen__content {
            position: relative;
            z-index: 1;
          }

          .login {
            width: 100%;
          }

          .login__field {
            position: relative;
            margin-bottom: 20px;
          }

          .login__icon {
            position: absolute;
            top: 50%;
            left: 10px;
            transform: translateY(-50%);
            color: rgba(0, 255, 255, 0.8);
            font-size: 20px;
          }

          .login__input {
            width: 100%;
            padding: 12px 40px;
            background-color: #1c1c1c;
            border: none;
            border-radius: 5px;
            color: #fff;
            font-size: 1em;
            box-shadow: inset 0 0 10px rgba(0, 255, 255, 0.3);
            transition: 0.3s;
          }

          .login__input:focus {
            outline: none;
            background-color: #111;
            box-shadow: inset 0 0 20px rgba(0, 255, 255, 0.6), 0 0 10px rgba(0, 255, 255, 0.3);
          }

          .login__submit {
            width: 100%;
            padding: 10px;
            background: linear-gradient(90deg, #00f5ff, #00c3ff);
            color: #fff;
            font-weight: bold;
            text-transform: uppercase;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0, 255, 255, 0.6);
            transition: background 0.3s, transform 0.3s, box-shadow 0.3s;
          }

          .login__submit:hover {
            background: linear-gradient(90deg, #00c3ff, #00f5ff);
            transform: scale(1.05);
            box-shadow: 0 8px 25px rgba(0, 255, 255, 0.8);
          }

          .file-input-container {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 20px;
          }

          .file-input-container label {
            color: rgba(0, 255, 255, 0.8);
            cursor: pointer;
          }

          .error-message {
            color: red;
            margin: 10px 0;
          }

          .success-message {
            color: green;
            margin: 10px 0;
          }
        `}
      </style>
      <div className="screen">
        <div className="screen__content">
          <form className="login" onSubmit={handleSubmit}>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            <div className="login__field">
              <FaUser className="login__icon" />
              <input
                type="text"
                name="name"
                className="login__input"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="login__field">
              <FaEnvelope className="login__icon" />
              <input
                type="email"
                name="email"
                className="login__input"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="login__field">
              <FaLock className="login__icon" />
              <input
                type="password"
                name="password"
                className="login__input"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="file-input-container">
              <FaCamera />
              <label htmlFor="profilePic">Upload Profile Picture</label>
              <input
                type="file"
                id="profilePic"
                name="profilePic"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <Button
              className="login__submit"
              type="submit"
              disabled={loading}
              variant="contained"
              color="primary"
              startIcon={loading && <CircularProgress size={24} />}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
