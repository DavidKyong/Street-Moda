import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function NewList() {
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.target);

    try {
      await uploadFile(formData);
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
      <form onSubmit={handleSubmit}>
        <div className="ml-10">
          <h1 className="text-3xl mb-4">Add a new listing</h1>
          <p>Category</p>
          <select name="category" className="border-2 border-black" required>
            <option value="apparels">Apparels</option>
            <option value="shoes">Shoes</option>
          </select>
          <p>Brand</p>
          <input name="brand" className="border-2 border-black" required />
          <p>Item Name</p>
          <input name="name" className="border-2 border-black" required />
          <p>Price</p>
          <input name="price" className="border-2 border-black" required />
          <p>Size</p>
          <input name="size" className="border-2 border-black" required />
          <p>Condition</p>
          <select name="condition" className="border-2 border-black" required>
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
            rows="7"></textarea>
          <p>Photos</p>
          <input
            type="file"
            name="image"
            accept=".png, .jpg, .jpeg, .gif"
            className="border-2 border-black"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-black text-white ml-10">
            Publish
          </button>
          <div>
            <Link to={`/sell/${userId}`}>Cancel</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
