import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <div className="header mt-2">
        <div className="w-full">
          <div className="flex items-baseline">
            <h1 className="text-5xl basis-11/12 ml-5">Street Moda</h1>
            <div className="basis-1/3 ml-10">
              <Link to="sell" className="">
                SELL
              </Link>
            </div>
            <div className="basis-1/3">
              <Link to="sign-in" className="border-solid border-4 py-2 px-4">
                LOGIN
              </Link>
            </div>
            <div className="basis-1/3">
              <Link to="sign-up" className="border-solid border-4 py-2 px-4">
                SIGN UP
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-gray-300 mt-3">backgroundcolor</div>
      </div>
    </>
  );
}
