import { useState } from 'react';
import { SigningUp } from '../data';
import { Link } from 'react-router-dom';
import SelectionHeader from '../components/SelectionHeader';

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(event.target);
      const userData = Object.fromEntries(formData.entries());
      SigningUp(userData);
    } catch (error) {
      alert(`Error registering user: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <SelectionHeader />
      <div className="flex items-center justify-center mt-5">
        <div className="register-container border-solid border-2 border-gray-300 w-3/5">
          <div className="row">
            <div className="justify-center flex">
              <h1 className="mt-5 text-3xl">Register</h1>
            </div>
          </div>
          <form className="m-3" onSubmit={handleSubmit}>
            <div className="">
              <div className="flex justify-center mb-4">
                <label>
                  <input
                    required
                    name="username"
                    type="text"
                    placeholder="Username"
                    className="border-solid border-2 rounded-full pl-3"></input>
                </label>
              </div>
              <div className="flex justify-center mb-4">
                <label>
                  <input
                    required
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="border-solid border-2 rounded-full pl-3"></input>
                </label>
              </div>
              <div className="flex justify-center">
                <label>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="border-solid border-2 rounded-full pl-3"></input>
                </label>
              </div>
            </div>
            <div className="flex justify-center">
              <p className="">Already have an account?</p>
              <Link
                to="/sign-in"
                className="ml-1 text-blue-800 hover:text-blue-500">
                Sign In
              </Link>
            </div>
            <div className="row">
              <div className="flex justify-end">
                <button
                  disabled={isLoading}
                  className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}>
                  {isLoading ? 'Registering...' : 'Register'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
