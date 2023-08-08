import React from 'react';
import { useEffect, useState } from 'react';
import { readShoeListing } from '../data';
import { Link } from 'react-router-dom';
import './shoes.css';

export default function Shoes() {
  const [shoes, setShoes] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const shoeData = await readShoeListing();
        setShoes(shoeData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (isLoading === undefined) load();
  }, [isLoading]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading list: {error.message}</div>;
  if (!shoes) return null;

  return (
    <div className="listing-page mt-7">
      <h2 className="ml-10 text-3xl">SHOES</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        {shoes.length > 0 ? (
          shoes.map((shoe) => <ListItem key={shoe.listingId} listing={shoe} />)
        ) : (
          <li>No products</li>
        )}
      </ul>
    </div>
  );
}

function ListItem({ listing }) {
  const { listingId, name, price, size, images, brand } = listing;
  return (
    <Link to={`/shoes/${listingId}`}>
      <li className="mr-10 ml-10">
        <div className="card-container">
          <img src={`${images}`} alt="placeholder" className="w-full" />
          <div className="flex mt-2 justify-between">
            <p className="mr-10 mb-2">{brand}</p>
            <p>{size}</p>
          </div>
          <div>
            <p className="mb-2 shoe-name">{name}</p>
            <p>${price}</p>
          </div>
        </div>
      </li>
    </Link>
  );
}
