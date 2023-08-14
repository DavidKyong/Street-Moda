import { Link } from 'react-router-dom';

export default function SelectionHeader() {
  return (
    <>
      <div className="flex justify-center">
        <div className="basis-1/2">
          <Link to="/apparels" className="font-bold">
            Apparels
          </Link>
        </div>
        <div>
          <Link to="/shoes" className="font-bold">
            Shoes
          </Link>
        </div>
      </div>
      <hr className="border-t border-gray-200 mt-3 w-full"></hr>
    </>
  );
}
