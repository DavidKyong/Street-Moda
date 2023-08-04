import React from 'react';
import Category from './pages/Category';
import Shoes from './pages/Shoes';
import Apparels from './pages/Apparels';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ShoeDetail from './pages/ShoeDetail';
import ApparelDetail from './pages/ApparelDetail';
import Header from './components/Header';
// import Sell from './pages/Sell';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  function handleSignIn() {
    setIsSignedIn(true);
  }

  function handleSignOut() {
    setIsSignedIn(false);
  }

  return (
    <div>
      <Header isSignedIn={isSignedIn} onSignOut={handleSignOut} />
      <Routes>
        {isSignedIn && <Route path="/" element={<Category />} />}
        <Route path="/" element={<Category />} />
        <Route path="shoes" element={<Shoes />} />
        <Route path="apparels" element={<Apparels />} />
        <Route path="/sign-in" element={<SignIn onSignIn={handleSignIn} />} />
        <Route path="/sign-up" element={<SignUp />} />
        {/* <Route path="sell/:userId" element={<Sell />} /> */}
        <Route path="shoes/:listingId" element={<ShoeDetail />} />
        <Route path="apparels/:listingId" element={<ApparelDetail />} />
      </Routes>
    </div>
  );
}
