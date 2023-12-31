import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { readUserListings, removeListing } from '../data';
import SelectionHeader from '../components/SelectionHeader';

export default function Sell() {
  const { userId, listingId } = useParams();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState(null);

  useEffect(() => {
    async function loadData(userId) {
      setIsLoading(true);
      try {
        const combinedData = await readUserListings(userId);
        setUserData(combinedData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    loadData(userId);
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
        setUserData((prevData) => ({
          ...prevData,
          listings: prevData.listings.filter(
            (item) => item.listingId !== selectedListingId
          ),
        }));
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
  if (!userData) return null;

  const { user, listings } = userData;

  return (
    <div>
      <SelectionHeader />
      <div className="ml-10 mt-5">
        <h1 className="text-4xl font-bold">{user.username}</h1>
        <h3 className="font-semibold">Joined {user.createdAt}</h3>
        <div className="ml-10 mt-10 text-2xl">
          <h2 className="font-bold">For Sale</h2>
        </div>
        <div className="flex justify-end mr-10">
          <Link
            className="border-2 border-black p-2 bg-black text-white font-bold"
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
            <div className="flex justify-center mt-5">
              <p>You have no items for sale</p>
            </div>
          )}
        </ul>
      </div>
      {showModal && (
        <div className="modal fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="modal-content bg-white p-20 rounded-lg shadow-md">
            <p>Are you sure you want to delete this listing?</p>
            <div className="modal-buttons flex justify-evenly">
              <button
                className="border-2 border-black rounded-xl py-1 px-2"
                onClick={handleModalClose}>
                No
              </button>
              <button
                className="border-2 border-black rounded-xl py-1 px-2"
                onClick={handleDelete}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ListItem({ listing, handleDelete, userId }) {
  const { name, price, images } = listing;
  return (
    <div className="flex m-10">
      <img
        className="basis-1/4 w-10 items-center"
        src={`${images}`}
        placeholder="empty"
        alt="empty"
      />
      <h1 className="basis-1/4 flex justify-center items-center text-xl">
        {name}
      </h1>
      <h1 className="basis-1/4 flex justify-center items-center text-xl">
        ${price}
      </h1>
      <div className="basis-1/4 flex items-center justify-center flex-col">
        <Link
          className="border-2 border-black flex justify-center w-full pt-3 pb-3 text-xl mb-1"
          to={`/sell/${userId}/edit/${listing.listingId}`}>
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="border-2 border-black flex justify-center w-full pt-3 pb-3 text-xl">
          Delete
        </button>
      </div>
    </div>
  );
}
