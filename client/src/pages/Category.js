import React, { useState } from 'react';
import Listing from './Listing';

export default function Category() {
  const [category, setCategory] = useState('');
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState('');

  const handleShoesClick = () => {
    setCategory('shoes');
    setIsCategorySelected(true);
    setCategoryTitle('SHOES');
  };

  const handleApparelsClick = () => {
    setCategory('apparels');
    setIsCategorySelected(true);
    setCategoryTitle('APPARELS');
  };

  const handleBackButtonClick = () => {
    setCategory('');
    setIsCategorySelected(false);
    setCategoryTitle('');
  };

  return (
    <div className="flex flex-col h-screen">
      {isCategorySelected && (
        <div className="flex justify-left mt-3 ml-3">
          <button
            className="bg-gray-300 hover:bg-gray-500 text-black font-bold py-1 px-2 rounded-full"
            onClick={handleBackButtonClick}>
            BACK
          </button>
        </div>
      )}

      {!isCategorySelected && (
        <div className="relative mt-5">
          <img
            src="/images/streetwear3.gif"
            alt="street wear icons"
            className=""
            style={{ margin: '0 auto', width: '60rem' }}
          />
          <button
            className="bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded-full absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            onClick={handleShoesClick}>
            SHOES
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded-full absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            onClick={handleApparelsClick}>
            APPARELS
          </button>
          <p className="m-8">
            Welcome to a vibrant online hub tailored for aficionados of
            streetwear – a cutting-edge platform exclusively designed for those
            seeking to buy and sell unique, sought-after urban fashion pieces
            amongst like-minded enthusiasts. Explore an immersive marketplace
            where individuals with a passion for street culture converge,
            forming a dynamic community of trendsetters and collectors. Embrace
            the fusion of style, creativity, and individuality as you discover
            and exchange top-tier streetwear from fellow aficionados who share
            your insatiable taste. Step into a world of fashion-forward
            possibilities, where your next statement piece awaits. Welcome to
            the epitome of streetwear exchange.
          </p>
        </div>
      )}

      {category === 'shoes' && <Listing categoryTitle={categoryTitle} />}
      {category === 'apparels' && <Listing categoryTitle={categoryTitle} />}
    </div>
  );
}
