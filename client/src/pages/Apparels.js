import React from 'react';
import { useEffect, useState } from 'react';
import { readApparelListing } from '../data';
import { Link } from 'react-router-dom';
import Header from '../components/header';

export default function Apparels() {
  const [apparels, setApparels] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const shoeData = await readApparelListing();
        setApparels(shoeData);
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
  if (!apparels) return null;

  return (
    <>
      <Header />
      <div className="listing-page mt-7">
        <h2 className="ml-10 text-3xl">Apparels</h2>
        <ul>
          {apparels.length > 0 ? (
            apparels.map((apparel) => (
              <ListItem key={apparel.listingId} listing={apparel} />
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
        <div className="flex justify ml-10 mt-5">
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
