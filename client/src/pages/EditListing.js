import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { readListing, updateListing } from '../data';

export default function EditListing() {
  const { listingId, userId } = useParams();
  const [listing, setListing] = useState({});
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [brand, setBrand] = useState();
  const [name, setName] = useState();
  const [size, setSize] = useState();
  const [condition, setCondition] = useState();
  const [category, setCategory] = useState();
  const [image, setImage] = useState();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    async function fetchListing() {
      try {
        const fetchedListing = await readListing(listingId);
        setListing(fetchedListing);
        setDescription(fetchedListing.description);
        setPrice(fetchedListing.price);
        setCategory(fetchedListing.category);
        setBrand(fetchedListing.brand);
        setName(fetchedListing.name);
        setCondition(fetchedListing.condition);
        setSize(fetchedListing.size);
        setImage(fetchedListing.images);
      } catch (error) {
        console.error('Error fetching listing:', error);
      }
    }
    fetchListing();
  }, [listingId]);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      await updateListing(listingId, userId, formData);
      setIsFormSubmitted(true);
    } catch (error) {
      console.error('Error updating listing:', error);
    }
  }

  return (
    <div>
      <div>
        {!isFormSubmitted ? (
          <form onSubmit={handleSubmit} className="border-2 border-black w-3/4">
            <div className="ml-10">
              <h1 className="text-3xl mb-5">Edit your listing</h1>
              <p className="text-xl mb-1 flex justify-center">Category</p>
              <label className="flex justify-center">
                <select
                  name="category"
                  className="border-2 border-black mb-4 w-1/5 p-1"
                  value={category}
                  required
                  onChange={(e) => setCategory(e.target.value)}>
                  <option value="apparels">Apparels</option>
                  <option value="shoes">Shoes</option>
                </select>
              </label>
              <p className="text-xl mb-1 flex justify-center">Brand</p>
              <label className="flex justify-center">
                <input
                  name="brand"
                  className="border-2 border-black mb-4 p-1"
                  value={brand}
                  required
                  onChange={(e) => setBrand(e.target.value)}
                />
              </label>
              <p className="text-xl mb-1 flex justify-center">Item Name</p>
              <label className="flex justify-center">
                <input
                  name="name"
                  className="border-2 border-black mb-4 p-1"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <p className="text-xl mb-1 justify-center flex">Price</p>
              <label className="flex justify-center">
                <input
                  name="price"
                  className="border-2 border-black mb-4 p-1"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>
              <p className="text-xl mb-1 justify-center flex">Size</p>
              <label className="flex justify-center">
                <input
                  name="size"
                  className="border-2 border-black mb-4 p-1"
                  required
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                />
              </label>
              <p className="text-xl mb-1 justify-center flex">Condition</p>
              <label className="justify-center flex">
                <select
                  name="condition"
                  className="border-2 border-black mb-4 p-1"
                  required
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}>
                  <option value="new">New/Never been worn</option>
                  <option value="gently-used">Gently Used</option>
                  <option value="used">Used</option>
                  <option value="worn">Very Worn</option>
                </select>
              </label>
              <p className="text-xl mb-1">Description</p>
              <textarea
                name="description"
                className="border-2 border-black mb-4 text-lg pl-1"
                required
                cols="81"
                rows="7"
                value={description}
                onChange={(e) => setDescription(e.target.value)}></textarea>
              <p className="text-xl mb-1">Photo</p>
              <input
                type="file"
                name="image"
                accept=".png, .jpg, .jpeg, .gif"
                className="border-2 border-gray-400 mb-4"
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end mr-10 items-center">
              <button
                type="submit"
                className="bg-black text-white ml-10 p-3 text-xl">
                Update
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
            <p>Listing updated successfully!</p>
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
