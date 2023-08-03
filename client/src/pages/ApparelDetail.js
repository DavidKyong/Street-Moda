import Header from '../components/Header';
import { useState, useEffect } from 'react';
import { readApparelsListId } from '../data';
import { useParams } from 'react-router-dom';

export default function ApparelDetail() {
  const { listingId } = useParams();
  const [product, setProduct] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load(listId) {
      try {
        const product = await readApparelsListId(listId);
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
  const { name, category, brand, description, price, size, condition, email } =
    product;

  return (
    <>
      <Header />
      <div className="flex mt-8">
        <div className="w-1/2 flex justify-center">
          <img alt="placeholder"></img>
        </div>
        <div className="w-1/2 flex justify-center ">
          <ul>
            <li>{name}</li>
            <li className="mt-4">{category}</li>
            <li className="mt-4">{brand}</li>
            <li className="mt-4">{size}</li>
            <li className="mt-4">{condition}</li>
            <li className="mt-4">{price}</li>
            <li className="mt-4">{email}</li>
          </ul>
        </div>
      </div>
      <div className="mt-10 ml-10 mr-10">
        <h1 className="">Description</h1>
        <p className="mt-5 border-solid border-black border-2">
          Extra Description about the item that sellers should know about.
          {description}
        </p>
      </div>
    </>
  );
}
