import { useState } from 'react';
import ApparelsListing from './ApparelsListing';
import ShoesListing from './ShoesListing';

export default function Category({ images }) {
  const [category, setCategory] = useState('');

  return (
    <>
      <div>
        <img
          src="/images/streetwear3.gif"
          alt="street wear icons"
          className="h-6/12 w-10/12 right-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full right-0 absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
        onClick={() => setCategory('shoes')}>
        SHOES
      </button>
      {category === 'shoes' ? <ShoesListing /> : ''}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full right-0 absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
        onClick={() => setCategory('apparels')}>
        APPARELS
      </button>
      {category === 'apparels' ? <ApparelsListing /> : ''}
    </>
  );
}
