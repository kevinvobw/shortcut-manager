import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from './AdminPage';
import ProtectedRoute from './ProtectedRoute';
import AdminAppPage from './AdminAppPage';
import LandingPage from './LandingPage';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path='/' element={<LandingPage/>} />
                    <Route 
                        path="/application" 
                        element={<ProtectedRoute component={AdminAppPage} />} 
                    />
                    <Route
                        path="/admin"
                        element={<ProtectedRoute component={AdminPage} />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
