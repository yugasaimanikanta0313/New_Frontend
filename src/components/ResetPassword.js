import React, { useState } from 'react';
import { resetPassword } from '../services/api'; // Import your API function for resetting the password
import { useSearchParams } from 'react-router-dom';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token'); // Get token from URL

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            setMessageType('error');
            return;
        }

        try {
            const response = await resetPassword({ token, newPassword: password });
            console.log("Reset password response:", response);
            if (response && response.success) {
                setMessage("Password reset successful!");
                setMessageType('success');
            } else {
                setMessage(response?.message || "Password reset failed. Please try again.");
                setMessageType('error');
            }
        } catch (error) {
            console.error("Reset password error:", error);
            setMessage(error.message || "Error occurred. Please try again.");
            setMessageType('error');
        }
    };

    const styles = {
        page: {
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
            marginBottom: '15px',
            padding: '10px',
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
            color: messageType === 'success' ? 'green' : 'red', // Dynamic color based on message type
        },
    };

    return (
        <div style={styles.page}>
            <h2>Reset Password</h2>
            <form style={styles.form} onSubmit={handleSubmit}>
                <label>
                    New Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                </label>
                <label>
                    Confirm Password:
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        style={styles.input}
                    />
                </label>
                <button type="submit" style={styles.button}>Reset Password</button>
            </form>
            {message && <p style={styles.message}>{message}</p>}
        </div>
    );
}

export default ResetPassword;
