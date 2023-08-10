import { useState, useEffect } from 'react';
import { readShoesListId } from '../data';
import { useParams } from 'react-router-dom';

export default function ShoeDetail() {
  const { listingId } = useParams();
  const [product, setProduct] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load(listId) {
      try {
        const product = await readShoesListId(listId);
        setProduct(product);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(true);
    load(listingId);
  }, [listingId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        Error Loading Product {listingId}: {error.message}
      </div>
    );
  }
  if (!product) return null;
  const { name, category, brand, description, price, size, condition, images } =
    product;

  return (
    <>
      <div className="flex mt-8">
        <div className="w-1/2 flex justify-center">
          <img
            src={`${images}`}
            alt="placeholder"
            className="ml-10 w-1/2"></img>
        </div>
        <div className="w-1/2 flex justify-center ">
          <ul>
            <li className="text-lg">{name}</li>
            <li className="mt-4 text-lg">{category}</li>
            <li className="mt-4 text-lg">{brand}</li>
            <li className="mt-4 text-lg">
              Size <span className="text-gray-600">{size}</span>
            </li>
            <li className="mt-4 text-lg">
              Condition <span className="text-gray-600">{condition}</span>
            </li>
            <li className="mt-4 text-2xl text-red-700">${price}</li>
            {/* <li className="mt-4 text-lg">{email}</li> */}
          </ul>
        </div>
      </div>
      <div className="mt-10 ml-10 mr-10">
        <h1 className="text-2xl">Description</h1>
        <p className="mt-5 border-solid border-black border-2 p-4">
          {description}
        </p>
      </div>
    </>
  );
}
