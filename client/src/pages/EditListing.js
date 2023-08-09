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
    } catch (error) {
      console.error('Error updating listing:', error);
    }
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="ml-10">
            <h1 className="text-3xl mb-4">Edit your listing</h1>
            <p>Category</p>
            <select
              name="category"
              className="border-2 border-black"
              value={category}
              required
              onChange={(e) => setCategory(e.target.value)}>
              <option value="apparels">Apparels</option>
              <option value="shoes">Shoes</option>
            </select>
            <p>Brand</p>
            <input
              name="brand"
              className="border-2 border-black"
              value={brand}
              required
              onChange={(e) => setBrand(e.target.value)}
            />
            <p>Item Name</p>
            <input
              name="name"
              className="border-2 border-black"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p>Price</p>
            <input
              name="price"
              className="border-2 border-black"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <p>Size</p>
            <input
              name="size"
              className="border-2 border-black"
              required
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
            <p>Condition</p>
            <select
              name="condition"
              className="border-2 border-black"
              required
              value={condition}
              onChange={(e) => setCondition(e.target.value)}>
              <option value="new">New/Never been worn</option>
              <option value="gently-used">Gently Used</option>
              <option value="used">Used</option>
              <option value="worn">Very Worn</option>
            </select>
            <p>Description</p>
            <textarea
              name="description"
              className="border-2 border-black"
              required
              cols="50"
              rows="7"
              value={description}
              onChange={(e) => setDescription(e.target.value)}></textarea>
            <p>Photos</p>
            <input
              type="file"
              name="image"
              accept=".png, .jpg, .jpeg, .gif"
              className="border-2 border-black"
              onChange={(e) => setImage(e.target.value)}
              value={image || ''}
              required
            />

            <button type="submit" className="bg-black text-white ml-10">
              Update
            </button>
          </div>
        </form>
      </div>

      <div>
        <Link to={`/sell/${userId}`}>Cancel</Link>
      </div>
    </div>
  );
}
