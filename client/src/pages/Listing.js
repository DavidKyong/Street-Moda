import React from 'react';
import { useEffect, useState } from 'react';
import { readShoeListing, readApparelListing } from '../data';
import { Link } from 'react-router-dom';

export default function Listing({ categoryTitle }) {
  const [list, setList] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        if (categoryTitle === 'SHOES') {
          const shoeData = await readShoeListing();
          setList(shoeData);
        }
        if (categoryTitle === 'APPARELS') {
          const apparelData = await readApparelListing();
          setList(apparelData);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (isLoading === undefined) load();
  }, [isLoading, categoryTitle]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading list: {error.message}</div>;
  if (!list) return null;

  return (
    <>
      <div className="listing-page mt-7">
        <h2 className="ml-10 text-3xl">{categoryTitle}</h2>
        <ul>
          {list.map((list) => (
            <ListItem key={list.listingId} listing={list} />
          ))}
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
