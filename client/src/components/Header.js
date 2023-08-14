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
                <Link to={`/sell/${userId}`} className="font-bold text-sm">
                  SELL
                </Link>
              )}
            </div>
            {isSignedIn ? (
              <div className="basis-1/3">
                <button
                  onClick={() => setShowModal(true)}
                  className="border-solid border-2 border-black py-2 px-4 font-bold text-sm">
                  SIGN OUT
                </button>
              </div>
            ) : (
              <>
                <div className="basis-1/3">
                  <Link
                    to="/sign-in"
                    className="border-solid border-2 border-black py-2 px-4 font-bold text-sm">
                    LOGIN
                  </Link>
                </div>
              </>
            )}
            <div className="basis-1/3">
              <Link
                to="/sign-up"
                className="border-solid border-black border-2 py-2 px-4 font-bold text-sm">
                SIGN UP
              </Link>
            </div>
          </div>
        </div>
        <hr className="bg-gray mt-5 h-2"></hr>
      </div>
      {showModal && (
        <div className="modal fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="modal-content bg-white p-20 rounded-lg shadow-md">
            <p className="">Are you sure you want to sign out?</p>
            <div className="modal-buttons flex justify-evenly">
              <button
                className="border-2 border-black rounded-xl py-1 px-2"
                onClick={handleModalClose}>
                No
              </button>
              <button
                className="border-2 border-black rounded-xl py-1 px-2"
                onClick={handleSignOutConfirmed}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
