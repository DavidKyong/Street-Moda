import React, { useEffect, useState } from 'react';
import { readApparelListing } from '../data';
import { Link } from 'react-router-dom';
import SelectionHeader from '../components/SelectionHeader';

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
      <SelectionHeader />
      <div className="listing-page mt-7">
        <img
          src="/images/apparels.png"
          alt="placeholder"
          className="w-full h-40 object-cover mb-2 h-252"
        />
        <h2 className="ml-10 text-4xl mb-5">Apparels</h2>
        <ul className="grid grid-cols-5 gap-10 mr-10 ml-10">
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
    <li>
      <div className="card-container mb-5">
        <Link to={`/apparels/${listingId}`}>
          <img
            src={`${images}`}
            alt="placeholder"
            className="w-full h-40 mb-2"
          />
        </Link>
        <div className="h-0.5 bg-gray-300 my-2"></div>
        <div className="flex mt-2 justify-between">
          <p className="mr-10 mb-2 font-semibold">{brand}</p>
          <p className="font-semibold">{size}</p>
        </div>
        <div>
          <p className="mb-2 shoe-name text-xs">{name}</p>
          <p>${price}</p>
        </div>
      </div>
    </li>
  );
}
