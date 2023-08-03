import Header from '../components/header';
import { useState, useEffect } from 'react';
import { readShoesListId } from '../data';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { listingId } = useParams();
  console.log(listingId);
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
  const { name, category, brand, description, price, size, condition, email } =
    product;

  return (
    <>
      <Header />
      <div className="row">
        <div className="column-half">
          <img alt="placeholder"></img>
        </div>
        <div className="column-half">
          <ul>
            <li>{name}</li>
            <li>{category}</li>
            <li>{brand}</li>
            <li>{size}</li>
            <li>{condition}</li>
            <li>{price}</li>
            <li>{description}</li>
            <li>{email}</li>
          </ul>
        </div>
      </div>
    </>
  );
}
