import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { readListing, updateListing } from '../data';
import SelectionHeader from '../components/SelectionHeader';

export default function EditListing() {
  const { listingId, userId } = useParams();
  const [listing, setListing] = useState({});
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [condition, setCondition] = useState('');
  const [category, setCategory] = useState('');
  const [contact, setContact] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchListing() {
      try {
        setIsLoading(true);
        const fetchedListing = await readListing(listingId);
        setListing(fetchedListing);
        setDescription(fetchedListing.description);
        setPrice(fetchedListing.price);
        setCategory(fetchedListing.category);
        setBrand(fetchedListing.brand);
        setName(fetchedListing.name);
        setCondition(fetchedListing.condition);
        setSize(fetchedListing.size);
        setContact(fetchedListing.contact);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
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
      <SelectionHeader />
      <div className="flex justify-center">
        {!isFormSubmitted ? (
          <form onSubmit={handleSubmit} className="w-3/4 mt-5">
            <div className="ml-10">
              <h1 className="text-3xl mb-8 font-bold">Edit your listing</h1>
              <p className="text-xl mb-4 font-semibold">Category</p>
              <label className="">
                <select
                  name="category"
                  className="border-2 border-gray-200 mb-8 pl-3 py-1 w-2/5"
                  value={category}
                  required
                  onChange={(e) => setCategory(e.target.value)}>
                  <option value="Apparels">Apparels</option>
                  <option value="Shoes">Shoes</option>
                </select>
              </label>
              <p className="text-xl mb-4 font-semibold">Brand</p>
              <label className="">
                <input
                  name="brand"
                  className="border-2 border-gray-200 mb-8 pl-3 py-1 w-2/5"
                  value={brand}
                  required
                  onChange={(e) => setBrand(e.target.value)}
                />
              </label>
              <p className="text-xl mb-4 font-semibold">Item Name</p>
              <label className="">
                <input
                  name="name"
                  className="border-2 border-gray-200 mb-8 pl-3 py-1 w-2/5"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <p className="text-xl mb-4 font-semibold">Price</p>
              <label className="">
                <input
                  name="price"
                  className="border-2 border-gray-200 mb-8 pl-3 py-1 w-2/5"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>
              <p className="text-xl mb-4 font-semibold">Size</p>
              <label className="">
                <input
                  name="size"
                  className="border-2 border-gray-200 mb-8 pl-3 py-1 w-2/5"
                  required
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                />
              </label>
              <p className="text-xl mb-4 font-semibold">Condition</p>
              <label className="">
                <select
                  name="condition"
                  className="border-2 border-gray-200 mb-8 pl-3 py-1 w-2/5"
                  required
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}>
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
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Phone number, email, etc"
                />
              </label>
              <p className="text-xl mb-4 font-semibold">Description</p>
              <textarea
                name="description"
                className="border-2 border-gray-200 mb-8 text-lg p-5"
                required
                cols="81"
                rows="7"
                value={description}
                onChange={(e) => setDescription(e.target.value)}></textarea>
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
