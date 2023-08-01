import { Link } from 'react-router-dom';

export default function SignIn() {
  return (
    <div className="register-container border-solid border-2 border-black w-3/4">
      <div className="row">
        <div className="justify-center flex">
          <h1>Register</h1>
        </div>
      </div>
      <form className="m-3">
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
            <label>
              Email
              <input
                required
                name="email"
                type="email"
                className="border-solid border-2 rounded-full pl-3"></input>
            </label>
          </div>
        </div>
        <div>
          <p className="flex justify-center">
            Already have an account? Sign In
          </p>
        </div>
        <div className="row">
          <div className="flex justify-end">
            <button className="bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded-full">
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
