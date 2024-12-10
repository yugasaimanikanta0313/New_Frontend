import React, { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { setSession } from '../utils/cookieUtils';
import { TextField, Button, Typography, CircularProgress, Box, Paper, InputLabel } from '@mui/material';
import { Email, Lock, Login as LoginIcon } from '@mui/icons-material';

function Login() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setIsSubmitting(true);
    //     try {
    //         const response = await login(credentials);
    //         const userId = response.userId;

    //         if (userId) {
    //             setSession('userId', userId, 30);
    //         }

    //         if (userId === 1) {
    //             navigate('/adminHome');
    //             alert("Admin Login successful!");
    //         } else {
    //             navigate('/userHome');
    //             alert("Login successful!");
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         alert("Login failed.");
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await login(credentials);
    
            if (response && response.success && response.userId) {
                const userId = response.userId;
                setSession('userId', userId, 30);
    
                if (userId === 1) {
                    navigate('/adminHome');
                    alert("Admin Login successful!");
                } else {
                    navigate('/userHome');
                    alert("Login successful!");
                }
            } else {
                // Show an alert if the login is unsuccessful
                alert(response.message || "Invalid email or password.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };
    

    const handleForgotPassword = () => {
        navigate('/forgot-password');
    };

    return (
        <Box
            sx={{
                background: 'linear-gradient(90deg, rgba(36,0,34,1) 0%, rgba(12,210,200,1) 0%, rgba(251,18,251,1) 0%, rgba(143,101,253,1) 43%, rgba(0,212,255,1) 100%)',                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Paper
                elevation={10}
                sx={{
                    padding: 2,
                    borderRadius: 3,
                    maxWidth: 300,
                    textAlign: 'center',
                    backgroundColor: '#1c1c1c',
                    boxShadow: '0 0 30px rgba(0, 102, 255, 0.6), 0 0 60px rgba(102, 18, 251, 0.3)',
                }}
            >
                <Typography variant="h4" color="#66ccff" sx={{ mb: 2, textShadow: '0 0 15px rgba(102, 18, 251, 0.7)' }}>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <InputLabel sx={{ color: '#66ccff', textAlign: 'left', marginBottom: '5px' }}>Email</InputLabel>
                    <TextField
                        fullWidth
                        variant="filled"
                        color="primary"
                        type="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        InputProps={{
                            startAdornment: (
                                <Email sx={{ color: '#66ccff', marginRight: 1 }} />
                            ),
                        }}
                        sx={{
                            mb: 2,
                            backgroundColor: '#333',
                            borderRadius: 1,
                            '& .MuiFilledInput-root': {
                                color: '#e6e6e6',
                            },
                            '& .MuiFilledInput-input': {
                                display: 'flex',
                                alignItems: 'center',
                                padding: '10px',
                            },
                        }}
                        required
                    />
                    <InputLabel sx={{ color: '#66ccff', textAlign: 'left', marginBottom: '5px' }}>Password</InputLabel>
                    <TextField
                        fullWidth
                        variant="filled"
                        color="primary"
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        InputProps={{
                            startAdornment: (
                                <Lock sx={{ color: '#66ccff', marginRight: 1 }} />
                            ),
                        }}
                        sx={{
                            mb: 3,
                            backgroundColor: '#333',
                            borderRadius: 1,
                            '& .MuiFilledInput-root': {
                                color: '#e6e6e6',
                            },
                            '& .MuiFilledInput-input': {
                                display: 'flex',
                                alignItems: 'center',
                                padding: '10px',
                            },
                        }}
                        required
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        startIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
                        sx={{
                            backgroundColor: '#66ccff',
                            color: '#000',
                            fontSize: '1.2em',
                            py: 1,
                            borderRadius: 3,
                            '&:hover': {
                                backgroundColor: '#5599ff',
                            },
                        }}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
                <Typography
                    onClick={handleForgotPassword}
                    variant="body2"
                    color="#66ccff"
                    sx={{ mt: 2, cursor: 'pointer', textDecoration: 'underline' }}
                >
                    Forgot Password?
                </Typography>
            </Paper>
        </Box>
    );
}

export default Login;
