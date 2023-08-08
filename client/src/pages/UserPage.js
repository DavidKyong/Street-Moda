import { useState } from 'react';

export default function NewList() {
  const [isLoading, setIsLoading] = useState();

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const data = {
      category: form.category.value,
      brand: form.brand.value,
      name: form.name.value,
      description: form.description.value,
      price: form.price.value,
      size: form.size.value,
      condition: form.condition.value,
      fileName: form.fileInput.files[0].name,
    };

    uploadFile(data);
    form.reset();
  }

  async function uploadFile(newForm) {
    const req = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newForm),
    };
    const response = await fetch(`/api/sell/new-listing`, req);
    if (!response.ok) {
      throw new Error(`Fetch Error ${response.status}`);
    }
    const responseBody = await response.json();
    console.log(responseBody);
    return responseBody;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="ml-10">
          <h1 className="text-3xl mb-4">Add a new listing</h1>
          <p>Category</p>
          <select
            name="category"
            type="text"
            className="border-2 border-black"
            required>
            <option value="apparels">Apparels</option>
            <option value="shoes">Shoes</option>
          </select>
          <p>Brand</p>
          <input
            name="brand"
            className="border-2 border-black"
            required></input>
          <p>Item Name</p>
          <input name="name" className="border-2 border-black" required></input>
          <p>Price</p>
          <input
            name="price"
            className="border-2 border-black"
            required></input>
          <p>Size</p>
          <input name="size" className="border-2 border-black" required></input>
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
            name="fileInput"
            accept=".png, .jpg, .jpeg, .gif"
            className="border-2 border-black"
            required></input>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-black text-white ml-10">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}
