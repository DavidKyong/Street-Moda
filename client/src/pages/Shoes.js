import React from 'react';
import { useEffect, useState } from 'react';
import { readShoeListing } from '../data';
import { Link } from 'react-router-dom';
import './shoes.css';
import SelectionHeader from '../components/SelectionHeader';

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
      <SelectionHeader />
      <div className="listing-page mt-3">
        <div>
          <img
            src="/images/shoes.png"
            alt="placeholder"
            className="w-full h-40 object-cover mb-2 h-252"
          />
        </div>
        <h2 className="ml-10 text-4xl mb-5">Shoes</h2>
        <ul className="grid grid-cols-5 gap-10 mr-10 ml-10">
          {shoes.length > 0 ? (
            shoes.map((shoe) => (
              <ListItem key={shoe.listingId} listing={shoe} />
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
        <Link to={`/shoes/${listingId}`}>
          <img
            src={`${images}`}
            alt="placeholder"
            className="w-full h-40 object mb-2"
          />
        </Link>
        <div className="h-0.5 bg-gray-300 my-2"></div>
        <div className="flex mt-2 justify-between">
          <p className="mr-10 mb-2 font-semibold">{brand}</p>
          <p className="font-semibold">{size}</p>
        </div>
        <div>
          <p className="mb-2 shoe-name text-xs">{name}</p>
          <p className="">${price}</p>
        </div>
      </div>
    </li>
  );
}
