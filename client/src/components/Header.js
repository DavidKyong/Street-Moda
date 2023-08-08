import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../components/AppContext';

export default function Header() {
  const { isSignedIn, handleSignOut, userId } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);

  function handleModalClose() {
    setShowModal(false);
  }

  function handleSignOutConfirmed() {
    localStorage.removeItem('userId');
    setShowModal(false);
    handleSignOut();
  }

  return (
    <>
      <div className="header mt-2">
        <div className="w-full">
          <div className="flex items-baseline">
            <div className="text-5xl basis-11/12 ml-5">
              <Link to="/">Street Moda</Link>
            </div>
            <div className="basis-1/3 ml-10">
              {isSignedIn && (
                <Link to={`/sell/${userId}`} className="">
                  SELL
                </Link>
              )}
            </div>
            {isSignedIn ? (
              <div className="basis-1/3">
                <button
                  onClick={() => setShowModal(true)}
                  className="border-solid border-4 py-2 px-4">
                  SIGN OUT
                </button>
              </div>
            ) : (
              <>
                <div className="basis-1/3">
                  <Link
                    to="/sign-in"
                    className="border-solid border-4 py-2 px-4">
                    LOGIN
                  </Link>
                </div>
              </>
            )}
            <div className="basis-1/3">
              <Link to="/sign-up" className="border-solid border-4 py-2 px-4">
                SIGN UP
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-gray-300 mt-3">backgroundcolor</div>
      </div>
      {showModal && (
        <div className="modal fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="modal-content bg-white p-20 rounded-lg shadow-md">
            <p>Are you sure you want to sign out?</p>
            <div className="modal-buttons">
              <button onClick={handleModalClose}>No</button>
              <button onClick={handleSignOutConfirmed}>Yes</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
