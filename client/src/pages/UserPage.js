import { useState, useEffect, useContext } from 'react';
import { updateListing, addListing } from '../data';
import AppContext from '../components/AppContext';

export default function NewList() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    const form = event.target;
    const formData = new FormData(form);

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
      console.log(responseBody);
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
        </div>
      </form>
    </div>
  );
}

// export default function NewList({ isEditMode, listingId}) {
//   const { userId } = useContext(AppContext);
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     category: '',
//     brand: '',
//     name: '',
//     description: '',
//     price: '',
//     size: '',
//     condition: '',
//     image: '',
//   });

//   // Fetch and populate formData in edit mode
//   useEffect(() => {
//     async function fetchListingData() {
//       try {
//         setIsLoading(true);
//         // Fetch listing data based on listingId and populate formData
//         const listingData = await updateListing(formData, userId, listingId); // Replace with your fetch logic
//         setFormData(listingData);
//       } catch (error) {
//         console.error('Error fetching listing data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     if (isEditMode && listingId) {
//       fetchListingData();
//     }
//   }, [isEditMode, listingId, userId, formData]);

//   async function handleSubmit(event) {
//   event.preventDefault();

//   // Create a FormData object to handle file uploads
//   const formData = new FormData(event.target);

//   try {
//     setIsLoading(true);

//     if (isEditMode) {
//       // Update an existing listing
//       await updateListing(formData, userId, listingId);
//     } else {
//       await addListing(formData);
//     }

//     // Reset form data
//     setFormData({
//       category: '',
//       brand: '',
//       name: '',
//       description: '',
//       price: '',
//       size: '',
//       condition: '',
//       image: '',
//     });

//     // Optionally, navigate to a different page after successful submission
//     // history.push('/sell/:userId');
//   } catch (error) {
//     console.error('Error submitting form:', error);
//   } finally {
//     setIsLoading(false);
//   }
// }

//   return (
//     <div className='ml-10'>
//       <form onSubmit={handleSubmit}>
//         {/* Render your form fields */}
//         <p>Category</p>
//         <select
//           name="category"
//           type="text"
//           className="border-2 border-black"
//           value={formData.category}
//           onChange={(event) => setFormData((prevData) => ({ ...prevData, category: event.target.value }))}
//           required
//         >
//           <option value="apparels">Apparels</option>
//           <option value="shoes">Shoes</option>
//         </select>
//         <p>Brand</p>
//           <input
//             name="brand"
//             className="border-2 border-black"
//             required
//             value={formData.brand}
//             onChange={(event) => setFormData((prevData) => ({ ...prevData, brand: event.target.value }))}></input>
//           <p>Item Name</p>
//           <input name="name" className="border-2 border-black" required value={formData.name} onChange={(event) => setFormData((prevData) => ({ ...prevData, name: event.target.value }))}
// ></input>
//           <p>Price</p>
//           <input
//             name="price"
//             className="border-2 border-black"
//             required
//             value={formData.price}
//             onChange={(event) => setFormData((prevData) => ({ ...prevData, price: event.target.value }))}

//             ></input>
//           <p>Size</p>
//           <input name="size" className="border-2 border-black" required value={formData.size} onChange={(event) => setFormData((prevData) => ({ ...prevData, size: event.target.value }))}></input>
//           <p>Condition</p>
//           <select name="condition" className="border-2 border-black" required value={formData.condition} onChange={(event) => setFormData((prevData) => ({ ...prevData, condition: event.target.value }))}
// >
//             <option value="new">New/Never been worn</option>
//             <option value="gently-used">Gently Used</option>
//             <option value="used">Used</option>
//             <option value="worn">Very Worn</option>
//           </select>
//           <p>Description</p>
//           <textarea
//             name="description"
//             className="border-2 border-black"
//             required
//             cols="50"
//             rows="7"
//             value={formData.description}
//             onChange={(event) => setFormData((prevData) => ({ ...prevData, description: event.target.value }))}
// ></textarea>
//           <p>Photos</p>
//           <input
//             type="file"
//             name="image"
//             accept=".png, .jpg, .jpeg, .gif"
//             className="border-2 border-black"
//             required
// ></input>
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="bg-black text-white ml-10"
//         >
//           {isEditMode ? 'Update' : 'Publish'}
//         </button>
//       </form>
//     </div>
//   );
// }
