import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './category.css';

export default function Category() {
  const [gifIndex, setGifIndex] = useState(0);
  const gifs = [
    '/images/gif2.gif',
    '/images/gif3.gif',
    '/images/gif4.gif',
    '/images/gif6.gif',
    '/images/gif7.gif',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setGifIndex((prevIndex) => (prevIndex + 1) % gifs.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [gifs.length]);

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="text-white text-center mt-16">
          <p className="text-3xl font-black text-border-2 text-border-black">
            Discover Your Unique Style on Our Practical Platform
          </p>
          <p className="mt-5 text-2xl font-black">
            Explore a curated collection of items from top global brands - your
            go-to for buying, selling, and enhancing your personal style.
          </p>
        </div>
      </div>
      <div className="relative mt-5">
        <img
          src={gifs[gifIndex]}
          alt="street wear icons"
          className="animate-slowdown"
          style={{
            width: '100%',
            height: '500px',
          }}
        />
      </div>
      <div>
        <Link
          to="/shoes"
          className=" hover:bg-blue-500 hover:border-blue-500 text-white border-white border-4 font-black py-2 px-4 text-xl absolute top-2/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2 bg-transparent">
          Shoes
        </Link>
        <Link
          to="/apparels"
          className="bg-transparent hover:bg-blue-500 hover:border-blue-500 border-4 border-white text-white font-black py-2 px-4 text-xl absolute top-2/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
          APPARELS
        </Link>
      </div>
    </div>
  );
}
