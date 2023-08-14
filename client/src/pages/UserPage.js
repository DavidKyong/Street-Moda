import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SelectionHeader from '../components/SelectionHeader';

export default function NewList() {
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [error, setError] = useState();

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.target);
    try {
      await uploadFile(formData);
      setIsFormSubmitted(true);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function uploadFile(formData) {
    const req = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    };

    try {
      const response = await fetch('/api/sell/new-listing', req);

      if (!response.ok) {
        throw new Error(`Fetch Error ${response.status}`);
      }

      const responseBody = await response.json();
      return responseBody;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  return (
    <div>
      <SelectionHeader />
      <div className="flex justify-center">
        {!isFormSubmitted ? (
          <form onSubmit={handleSubmit} className="w-3/4 mt-5">
            <div className="ml-10">
              <h1 className="text-3xl mb-8 font-bold">Add a new listing</h1>
              <p className="text-xl mb-4 font-semibold">Category</p>
              <label className="">
                <select
                  name="category"
                  className="border-2 border-gray-200 mb-8 pl-3 py-1 w-2/5"
                  required>
                  <option></option>
                  <option value="Apparels">Apparels</option>
                  <option value="Shoes">Shoes</option>
                </select>
              </label>
              <p className="text-xl mb-4 font-semibold">Brand</p>
              <label className="">
                <input
                  name="brand"
                  className="border-2 border-gray-200 mb-8 pl-3 py-1 w-2/5"
                  required
                  placeholder="Brand, Designer, etc"
                />
              </label>
              <p className="text-xl mb-4 font-semibold ">Item Name</p>
              <label className="">
                <input
                  name="name"
                  className="border-2 border-gray-200 mb-8 pl-3 py-1 w-2/5"
                  required
                  placeholder="Item name"
                />
              </label>
              <p className="text-xl mb-4 font-semibold ">Price</p>
              <label className="">
                <input
                  name="price"
                  className="border-2 border-gray-200 mb-8 pl-3 py-1 w-2/5"
                  required
                  placeholder="$ Price (USD)"
                />
              </label>
              <p className="text-xl mb-4 font-semibold">Size</p>
              <label className="">
                <input
                  name="size"
                  className="border-2 border-gray-200 mb-8 pl-3 py-1 w-2/5"
                  required
                />
              </label>
              <p className="text-xl mb-4 font-semibold">Condition</p>
              <label className="">
                <select
                  name="condition"
                  className="border-2 border-gray-200 mb-8 pl-3 py-1 w-2/5"
                  required>
                  <option></option>
                  <option value="New/Never been worn">
                    New/Never been worn
                  </option>
                  <option value="Gently-Used">Gently Used</option>
                  <option value="Used">Used</option>
                  <option value="Worn">Very Worn</option>
                </select>
              </label>
              <p className="text-xl mb-1 flex font-semibold">Contact</p>
              <label className="">
                <input
                  name="contact"
                  className="border-2 border-gray-200 mb-8 pl-3 py-1 w-2/5"
                  required
                  placeholder="Phone number, email, etc"
                />
              </label>
              <p className="text-xl mb-1 font-semibold">Description</p>
              <textarea
                name="description"
                className="border-2 border-gray-200 mb-8 text-lg p-5"
                placeholder="Add details about condition, how the garment fits, additional measurements, shipping policies, retail price, link to retail page, etc"
                required
                cols="81"
                rows="7"></textarea>
              <p className="text-xl mb-4 font-semibold">Photo</p>
              <input
                type="file"
                name="image"
                accept=".png, .jpg, .jpeg, .gif"
                className="border-2 border-gray-200 mb-4"
                required
              />
            </div>
            <div className="flex justify-end mr-10 items-center mb-3">
              <button
                type="submit"
                className="bg-black text-white ml-10 py-2 px-4 text-xl">
                Publish
              </button>
              <div className="flex justify-end mr-5 items-center ml-5">
                <div>
                  <Link to={`/sell/${userId}`}>Cancel</Link>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="mt-5 ml-10">
            <p>Listing posted successfully!</p>
            <Link
              to={`/sell/${userId}`}
              className="text-blue-500 underline ml-2">
              Go back to sell page
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
