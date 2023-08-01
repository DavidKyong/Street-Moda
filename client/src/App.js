import React from 'react';
import Category from './pages/Category';
import Listing from './pages/Listing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Routes>
      <Route index path="/" element={<Category />} />
      <Route path="shoes" element={<Listing />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
    </Routes>
  );
}
