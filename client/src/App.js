import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Category from './pages/Category';
import Shoes from './pages/Shoes';
import Apparels from './pages/Apparels';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ShoeDetail from './pages/ShoeDetail';
import ApparelDetail from './pages/ApparelDetail';
import Header from './components/Header';
import Sell from './pages/Sell';
import UserPage from './pages/UserPage';
import AppContext from './components/AppContext';
import './App.css';

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  function handleSignIn(userId) {
    setIsSignedIn(true);
    setUserId(userId);
    localStorage.setItem('userId', userId);
  }

  function handleSignOut() {
    setIsSignedIn(false);
    setUserId(null);
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
  }

  return (
    <div>
      <AppContext.Provider
        value={{
          isSignedIn,
          userId,
          handleSignIn,
          handleSignOut,
        }}>
        <Header />
        <Routes>
          <Route path="/sign-in" element={<SignIn onSignIn={handleSignIn} />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/" element={<Category />} />
          <Route path="shoes" element={<Shoes />} />
          <Route path="apparels" element={<Apparels />} />
          {isSignedIn ? (
            <>
              <Route path="/sell/:userId" element={<Sell />} />
              <Route path="/sell/:userId/new-listing" element={<UserPage />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/sign-in" replace />} />
          )}
          <Route path="/shoes/:listingId" element={<ShoeDetail />} />
          <Route path="/apparels/:listingId" element={<ApparelDetail />} />
        </Routes>
      </AppContext.Provider>
    </div>
  );
}
