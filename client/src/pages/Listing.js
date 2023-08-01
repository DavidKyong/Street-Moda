import React from 'react';
import { useEffect, useState } from 'react';
import { readShoeListing } from '../data';

export default function Listing({ categoryTitle }) {
  const [shoeListing, setShoeListing] = useState([]);
  // const [apparelListing , setApparelListing] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      try {
        const listingData = await readShoeListing();
        setShoeListing(listingData);
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
  if (!shoeListing) return null;

  return (
    <>
      <div className="listing-page mt-7">
        <h2 className="ml-10 text-3xl">{categoryTitle}</h2>
        <ul>
          {shoeListing.map((list) => (
            <ListItem key={list.listingId} listing={list} />
          ))}
        </ul>
      </div>
      <div className="register-container border-solid border-2 border-black w-3/4">
        <div className="row">
          <div className="justify-center flex">
            <h1>Register</h1>
          </div>
        </div>
        <form className="m-3">
          <div className="">
            <div className="flex justify-center mb-4">
              <label>
                Username
                <input
                  required
                  name="username"
                  type="text"
                  className="border-solid border-2 rounded-full pl-3"></input>
              </label>
            </div>
            <div className="flex justify-center mb-4">
              <label>
                Password
                <input
                  required
                  name="password"
                  type="password"
                  className="border-solid border-2 rounded-full pl-3"></input>
              </label>
            </div>
            <div className="flex justify-center">
              <label>
                Email
                <input
                  required
                  name="email"
                  type="email"
                  className="border-solid border-2 rounded-full pl-3"></input>
              </label>
            </div>
          </div>
          <div>
            <p className="flex justify-center">
              Already have an account? Sign In
            </p>
          </div>
          <div className="row">
            <div className="flex justify-end">
              <button className="bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded-full">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="sign-in-container border-solid border-2 border-black">
        <div className="row">
          <div className="column">
            <h1>Sign In</h1>
          </div>
        </div>
        <form>
          <div className="row">
            <div className="column">
              <label>
                Username
                <input
                  required
                  name="username"
                  type="text"
                  className="border-solid border-2 rounded-full pl-3"></input>
              </label>
              <label>
                Password
                <input
                  required
                  name="password"
                  type="password"
                  className="border-solid border-2 rounded-full pl-3"></input>
              </label>
            </div>
          </div>
          <div className="row">
            <div className="column">
              <button className="bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded-full">
                Sign In
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

function ListItem({ shoeListing }) {
  return (
    <li>
      <div className="flex justify ml-10 mt-5">
        <div className="basis-1/4">
          <img
            src="/images/placeholder-image-square.jpg"
            alt="placeholder"
            className="w-3/4"
          />
          <p>{shoeListing.name}</p>
          <p>${shoeListing.price}</p>
          <p>{shoeListing.size}</p>
        </div>
      </div>
    </li>
  );
}
