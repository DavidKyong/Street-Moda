import React from 'react';
import { useEffect, useState } from 'react';
import { readShoeListing } from '../data';
import { Link } from 'react-router-dom';

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
    <>
      <div className="listing-page mt-7">
        <h2 className="ml-10 text-3xl">SHOES</h2>
        <ul>
          {shoes.length > 0 ? (
            shoes.map((shoe) => (
              <ListItem key={shoe.listingId} listing={shoe} />
            ))
          ) : (
            <li>No products</li>
          )}
        </ul>
      </div>
    </>
  );
}

function ListItem({ listing }) {
  const { listingId, name, price, size, images } = listing;
  return (
    <Link to={`/shoes/${listingId}`}>
      <li>
        <div className="flex justify ml-10 mt-5 ">
          <div className="basis-1/4">
            <img
              src={`/images/${images}`}
              alt="placeholder"
              className="w-3/4"
            />
            <p>{name}</p>
            <p>${price}</p>
            <p>{size}</p>
          </div>
        </div>
      </li>
    </Link>
  );
}
