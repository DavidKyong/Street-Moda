import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function NewList() {
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.target);
    try {
      await uploadFile(formData);
      setIsFormSubmitted(true);
    } catch (error) {
      console.error(error);
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
      <div>
        {!isFormSubmitted ? (
          <form onSubmit={handleSubmit} className="border-2 border-black w-3/4">
            <div className="ml-10">
              <h1 className="text-3xl mb-5">Add your listing</h1>
              <p className="text-xl mb-1 flex justify-center">Category</p>
              <label className="flex justify-center">
                <select
                  name="category"
                  className="border-2 border-black mb-4 w-1/5 p-1"
                  required>
                  <option value="apparels">Apparels</option>
                  <option value="shoes">Shoes</option>
                </select>
              </label>
              <p className="text-xl mb-1 flex justify-center">Brand</p>
              <label className="flex justify-center">
                <input
                  name="brand"
                  className="border-2 border-black mb-4 p-1"
                  required
                />
              </label>
              <p className="text-xl mb-1 flex justify-center">Item Name</p>
              <label className="flex justify-center">
                <input
                  name="name"
                  className="border-2 border-black mb-4 p-1"
                  required
                />
              </label>
              <p className="text-xl mb-1 justify-center flex">Price</p>
              <label className="flex justify-center">
                <input
                  name="price"
                  className="border-2 border-black mb-4 p-1"
                  required
                />
              </label>
              <p className="text-xl mb-1 justify-center flex">Size</p>
              <label className="flex justify-center">
                <input
                  name="size"
                  className="border-2 border-black mb-4 p-1"
                  required
                />
              </label>
              <p className="text-xl mb-1 justify-center flex">Condition</p>
              <label className="justify-center flex">
                <select
                  name="condition"
                  className="border-2 border-black mb-4 p-1"
                  required>
                  <option value="new">New/Never been worn</option>
                  <option value="gently-used">Gently Used</option>
                  <option value="used">Used</option>
                  <option value="worn">Very Worn</option>
                </select>
              </label>
              <p className="text-xl mb-1 flex justify-center">Contact</p>
              <label className="flex justify-center">
                <input
                  name="contact"
                  className="border-2 border-black mb-4 p-1"
                  required
                />
              </label>
              <p className="text-xl mb-1">Description</p>
              <textarea
                name="description"
                className="border-2 border-black mb-4 text-lg pl-1"
                required
                cols="81"
                rows="7"></textarea>
              <p className="text-xl mb-1">Photo</p>
              <input
                type="file"
                name="image"
                accept=".png, .jpg, .jpeg, .gif"
                className="border-2 border-gray-400 mb-4"
                required
              />
            </div>
            <div className="flex justify-end mr-10 items-center">
              <button
                type="submit"
                className="bg-black text-white ml-10 p-3 text-xl">
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
