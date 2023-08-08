import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../components/AppContext';

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
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
      console.log('Signed In', user, '; received token:', token);
    } catch (error) {
      alert(`Error signing in: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center mt-5">
      <div className="register-container border-solid border-2 border-black w-3/4">
        <div className="row">
          <div className="justify-center flex">
            <h1>Login</h1>
          </div>
        </div>
        <form className="m-3" onSubmit={handleSubmit}>
          <div className="">
            <div className="flex justify-center mb-4">
              <label>
                Username
                <input
                  required
                  name="username"
                  type="text"
                  className="border-solid border-2 rounded-full pl-3"></input>
              </label>
            </div>
            <div className="flex justify-center mb-4">
              <label>
                Password
                <input
                  required
                  name="password"
                  type="password"
                  className="border-solid border-2 rounded-full pl-3"></input>
              </label>
            </div>
            <div className="flex justify-center">
              Don't have an account?
              <Link to="/sign-up" className="ml-1">
                Sign Up
              </Link>
            </div>
          </div>

          <div className="row">
            <div className="flex justify-end">
              <button
                disabled={isLoading}
                className="bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded-full">
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
