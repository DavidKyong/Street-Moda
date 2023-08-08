import { Link, useParams } from 'react-router-dom';
import { readUserListings } from '../data';
import { useState, useEffect } from 'react';

export default function Sell() {
  const { userId } = useParams();
  const [listing, setListing] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load(userId) {
      setIsLoading(true);
      try {
        const userData = await readUserListings(userId);
        setListing(userData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    load(userId);
  }, [userId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        Error Loading Product {userId}: {error.message}
      </div>
    );
  }
  if (!listing) return null;

  return (
    <div>
      <div className="ml-10">
        <div>
          <h1>Username</h1>
          <h3>Joined in ...</h3>
        </div>
        <div className="flex justify-end mr-10">
          <Link
            to={`/sell/${userId}/new-listing`}
            className="border-2 border-black text-white bg-black">
            + NEW LISTING
          </Link>
        </div>
        <div>
          <h2>For Sale</h2>
        </div>
        <ul>
          {listing.length > 0 ? (
            listing.map((list) => (
              <ListItem key={list.listingId} listing={list} />
            ))
          ) : (
            <div>
              <p>You have no items for sale</p>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

function ListItem({ listing }) {
  const { name, price, images } = listing;
  return (
    <div className="flex">
      <img
        className="basis-1/4"
        src={`${images}`}
        placeholder="empty"
        alt="empty"
      />
      <h1 className="basis-1/4">{name}</h1>
      <h1 className="basis-1/4">{price}</h1>
      <div className="basis-1/4">
        <button className="border-2 border-black">Edit</button>
        <button className="border-2 border-black">Delete</button>
      </div>
    </div>
  );
}
