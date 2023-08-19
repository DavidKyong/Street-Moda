import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { readListing, updateListing } from '../data';
import SelectionHeader from '../components/SelectionHeader';

export default function NewList() {
  const { userId, listingId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [error, setError] = useState();
  const [firstImage, setFirstImage] = useState();
  const [secondImage, setSecondImage] = useState();
  const [thirdImage, setThirdImage] = useState();
  const [fourthImage, setFourthImage] = useState();
  const [listing, setListing] = useState({});
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [condition, setCondition] = useState('');
  const [category, setCategory] = useState('');
  const [contact, setContact] = useState('');

  function handleFirstChange(event) {
    setFirstImage(URL.createObjectURL(event.target.files[0]));
  }

  function handleSecondChange(event) {
    setSecondImage(URL.createObjectURL(event.target.files[0]));
  }

  function handleThirdChange(event) {
    setThirdImage(URL.createObjectURL(event.target.files[0]));
  }

  function handleFourthChange(event) {
    setFourthImage(URL.createObjectURL(event.target.files[0]));
  }

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
            </div>
            <div className="mb-8 ml-10 mr-10">
              <p className="text-xl mb-4 font-semibold">Photos</p>
              <div class="flex justify-center">
                <div className="w-2/5">
                  <label
                    htmlFor="dropzone-file-1"
                    className="flex items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
                    {!firstImage ? (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16">
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{' '}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                        <input
                          id="dropzone-file-1"
                          type="file"
                          className="hidden"
                          onChange={handleFirstChange}
                        />
                      </div>
                    ) : (
                      <div>
                        <input
                          id="dropzone-file-1"
                          type="file"
                          className="hidden"
                          onChange={handleFirstChange}
                        />
                        <img src={firstImage} alt="First" className="bg-none" />
                      </div>
                    )}
                  </label>
                </div>
                <div className="w-1/5">
                  <label
                    htmlFor="dropzone-file-2"
                    className="flex items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
                    {!secondImage ? (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16">
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{' '}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                        <input
                          id="dropzone-file-2"
                          type="file"
                          className="hidden"
                          onChange={handleSecondChange}
                        />
                      </div>
                    ) : (
                      <div>
                        <input
                          id="dropzone-file-2"
                          type="file"
                          className="hidden"
                          onChange={handleSecondChange}
                        />
                        <img src={secondImage} alt="Second" />
                      </div>
                    )}
                  </label>
                </div>
                <div className="w-1/5">
                  <label
                    htmlFor="dropzone-file-3"
                    className="flex items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer ">
                    {!thirdImage ? (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16">
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{' '}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                        <input
                          id="dropzone-file-3"
                          type="file"
                          className="hidden"
                          onChange={handleThirdChange}
                        />
                      </div>
                    ) : (
                      <div>
                        <input
                          id="dropzone-file-3"
                          type="file"
                          className="hidden"
                          onChange={handleThirdChange}
                        />
                        <img src={thirdImage} alt="Third" />
                      </div>
                    )}
                  </label>
                </div>
                <div className="w-1/5">
                  <label
                    htmlFor="dropzone-file-4"
                    className="flex items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
                    {!fourthImage ? (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16">
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{' '}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                        <input
                          id="dropzone-file-4"
                          type="file"
                          className="hidden"
                          onChange={handleFourthChange}
                        />
                      </div>
                    ) : (
                      <div>
                        <input
                          id="dropzone-file-4"
                          type="file"
                          className="hidden"
                          onChange={handleFourthChange}
                        />
                        <img src={fourthImage} alt="Fourth" className />
                      </div>
                    )}
                  </label>
                </div>
              </div>
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
