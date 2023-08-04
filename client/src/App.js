import React from 'react';
import Category from './pages/Category';
import Shoes from './pages/Shoes';
import Apparels from './pages/Apparels';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ShoeDetail from './pages/ShoeDetail';
import ApparelDetail from './pages/ApparelDetail';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Category />} />
        <Route path="shoes" element={<Shoes />} />
        <Route path="apparels" element={<Apparels />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="shoes/:listingId" element={<ShoeDetail />} />
        <Route path="apparels/:listingId" element={<ApparelDetail />} />
      </Routes>
    </div>
  );
}
