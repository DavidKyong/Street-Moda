import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../components/AppContext';
import SelectionHeader from '../components/SelectionHeader';

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const { handleSignIn } = useContext(AppContext);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(event.target);
      const userData = Object.fromEntries(formData.entries());
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      };
      const res = await fetch('/api/auth/sign-in', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const { user, token } = await res.json();
      handleSignIn(user.userId);
      localStorage.setItem('token', token);
    } catch (error) {
      alert(`Error signing in: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <SelectionHeader />

      <div className="flex flex-col items-center justify-center">
        <div className="register-container border-solid border-2 border-gray-300 w-3/5 mt-10">
          <div className="row">
            <div className="justify-center flex">
              <h1 className="mt-5 text-3xl">Login</h1>
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
                Don't have an account?
                <Link
                  to="/sign-up"
                  className="ml-1 text-blue-800 hover:text-blue-500">
                  Sign Up
                </Link>
              </div>
            </div>

            <div className="row">
              <div className="flex justify-end">
                <button
                  disabled={isLoading}
                  className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md ${
                    isLoading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
