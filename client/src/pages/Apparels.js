import React from 'react';
import { useEffect, useState } from 'react';
import { readApparelListing } from '../data';
import { Link } from 'react-router-dom';

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
      <div className="listing-page mt-7">
        <h2 className="ml-10 text-3xl">Apparels</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          {apparels.length > 0 ? (
            apparels.map((apparel) => (
              <ListItem key={apparel.listingId} listing={apparel} />
            ))
          ) : (
            <li className="flex justify-center">No products</li>
          )}
        </ul>
      </div>
    </>
  );
}

function ListItem({ listing }) {
  const { listingId, name, price, size, images, brand } = listing;
  return (
    <Link to={`/apparels/${listingId}`}>
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
