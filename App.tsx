
import React, { useState, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MOCK_USER, MOCK_REQUESTS } from './constants';
import { DonationRequest, RequestStatus, User } from './types';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import Header from './components/Header';

const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [requests, setRequests] = useState<DonationRequest[]>(MOCK_REQUESTS);

    const handleLogin = useCallback((user: User) => {
        setCurrentUser(user);
    }, []);

    const handleLogout = useCallback(() => {
        setCurrentUser(null);
    }, []);

    const addRequest = useCallback((newRequest: Omit<DonationRequest, 'id' | 'createdAt' | 'status' | 'distance'>) => {
        const fullRequest: DonationRequest = {
            ...newRequest,
            id: `req-${Date.now()}`,
            createdAt: new Date(),
            status: RequestStatus.PENDING,
            distance: Math.round((Math.random() * 15 + 1) * 10) / 10, // Random distance 1-16km
        };
        setRequests(prev => [fullRequest, ...prev]);
    }, []);

    if (!currentUser) {
        return <LoginPage onLogin={handleLogin} />;
    }

    return (
        <HashRouter>
            <div className="min-h-screen bg-brand-gray-50 flex flex-col">
                <Header onLogout={handleLogout} />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<HomePage user={currentUser} requests={requests} addRequest={addRequest} />} />
                        <Route path="/profile" element={<ProfilePage user={currentUser} />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </main>
            </div>
        </HashRouter>
    );
};

export default App;
