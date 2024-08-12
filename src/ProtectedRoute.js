import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ component: Component }) {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        // Optionally, return a loading indicator while Auth0 checks the authentication state
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        // If not authenticated, redirect to the login page
        return <Navigate to="/" />;
    }

    // If authenticated, render the component
    return <Component />;
}

export default ProtectedRoute;
