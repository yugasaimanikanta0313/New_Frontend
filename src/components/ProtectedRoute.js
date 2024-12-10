// src/components/ProtectedRoute.js

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { getSession } from '../utils/cookieUtils'; // Import your cookie utility

const ProtectedRoute = ({ element: Element, ...rest }) => {
    const isAuthenticated = getSession('userId') !== null; // Check if userId cookie exists

    return (
        <Route
            {...rest}
            element={isAuthenticated ? Element : <Navigate to="/login" replace />}
        />
    );
};

export default ProtectedRoute;
