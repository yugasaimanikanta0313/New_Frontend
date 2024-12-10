import React, { useState } from 'react';
import { forgotPassword } from '../services/api'; // Adjust the path as necessary

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        try {
            const response = await forgotPassword({ email }); // Call your API for password reset
            setMessage(response.message); // Adjust according to your API response
            alert("link sent..!");
        } catch (error) {
            console.error(error);
            setMessage('Failed to send password reset link. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const styles = {
        wrapper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: '#f0f0f0',
            color: '#333',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '5px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            width: '300px',
        },
        input: {
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            outline: 'none',
            fontSize: '16px',
        },
        button: {
            padding: '10px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#00f5ff',
            color: '#000',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s',
        },
        buttonHover: {
            backgroundColor: '#00ccff',
        },
        message: {
            marginTop: '10px',
            color: 'red',
        },
    };

    return (
        <div style={styles.wrapper}>
            <h2>Forgot Password</h2>
            <form style={styles.form} onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button} disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                </button>
            </form>
            {message && <p style={styles.message}>{message}</p>}
        </div>
    );
}

export default ForgotPassword;
