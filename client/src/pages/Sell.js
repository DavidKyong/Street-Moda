import { Link, useParams } from 'react-router-dom';
import { readUserListings, removeListing } from '../data';
import { useState, useEffect } from 'react';

export default function Sell() {
  const { userId } = useParams();
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState(null);

  useEffect(() => {
    async function load(userId) {
      setIsLoading(true);
      try {
        const userData = await readUserListings(userId);
        setListings(userData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    load(userId);
  }, [userId]);

  function handleModalClose() {
    setShowModal(false);
    setSelectedListingId(null);
  }

  function handleModalShow(listingId) {
    setShowModal(true);
    setSelectedListingId(listingId);
  }

  async function handleDelete() {
    try {
      if (selectedListingId) {
        await removeListing(selectedListingId);
        setListings((prevListing) =>
          prevListing.filter((item) => item.listingId !== selectedListingId)
        );
        handleModalClose();
      }
    } catch (error) {
      console.error('Error deleting listing:', error);
    }
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        Error Loading Product {userId}: {error.message}
      </div>
    );
  }
  if (!listings) return null;

  return (
    <div>
      <div className="ml-10">
        <h1>Username</h1>
        <h3>Joined in ...</h3>
        <div>
          <h2>For Sale</h2>
        </div>
        <div className="flex justify-end mr-10">
          <Link
            className="border-2 border-black"
            to={`/sell/${userId}/new-listing`}>
            +New Listing
          </Link>
        </div>
        <ul>
          {listings.length > 0 ? (
            listings.map((list) => (
              <ListItem
                key={list.listingId}
                listing={list}
                handleDelete={() => handleModalShow(list.listingId)}
                userId={userId}
              />
            ))
          ) : (
            <div>
              <p>You have no items for sale</p>
            </div>
          )}
        </ul>
      </div>
      {showModal && (
        <div className="modal fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="modal-content bg-white p-20 rounded-lg shadow-md">
            <p>Are you sure you want to delete this listing?</p>
            <div className="modal-buttons">
              <button onClick={handleModalClose}>No</button>
              <button onClick={handleDelete}>Yes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ListItem({ listing, handleDelete, userId }) {
  const { listingId, name, price, images } = listing;
  return (
    <div className="flex m-10">
      <img
        className="basis-1/4 w-10"
        src={`${images}`}
        placeholder="empty"
        alt="empty"
      />
      <h1 className="basis-1/4 flex justify-center">{name}</h1>
      <h1 className="basis-1/4 flex justify-center">${price}</h1>
      <div className="basis-1/4">
        <Link
          className="border-2 border-black flex justify-center"
          to={`/sell/${userId}/edit/${listing.listingId}`}>
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="border-2 border-black flex justify-center">
          Delete
        </button>
      </div>
    </div>
  );
}
