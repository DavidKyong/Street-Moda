import React from 'react';
import { useEffect, useState } from 'react';
import { readListing } from '../data';

export default function Listing({ categoryTitle }) {
  const [listing, setListing] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function load() {
      try {
        const listingData = await readListing();
        setListing(listingData);
      } catch (error) {
        setError(error);
      }
    }

    load();
  }, []);

  return (
    <div className="listing-page mt-7">
      <h2 className="ml-10 text-3xl">{categoryTitle}</h2>
      <ul>
        {listing.map((list) => (
          <ListItem key={list.listingId} listing={list} />
        ))}
      </ul>
    </div>
  );
}

function ListItem({ listing }) {
  return (
    <li>
      <div className="flex justify ml-10 mt-5">
        <div className="basis-1/4">
          <img
            src="/images/placeholder-image-square.jpg"
            alt="placeholder"
            className="w-3/4"
          />
          <p>{listing.name}</p>
          <p>${listing.price}</p>
          <p>{listing.size}</p>
        </div>
      </div>
    </li>
  );
}
