import React from 'react';
import Header from './components/header';
import Category from './pages/Category';
// import ApparelsListing from './pages/ApparelsListing';
// import ShoesListing from './pages/ApparelsListing';
// import { useState } from 'react';
// import { Router, Route } from 'react-router-dom';

// const [serverData, setServerData] = useState('');

// useEffect(() => {
//   async function readServerData() {
//     const resp = await fetch('/api/hello');
//     const data = await resp.json();

//     console.log('Data from server:', data);

//     setServerData(data.message);
//   }

//   readServerData();
// }, []);

export default function App() {
  return (
    <>
      <Header />
      <Category />
    </>
  );
}
