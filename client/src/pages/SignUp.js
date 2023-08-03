export default function SignUp() {
  return (
    <div className="sign-in-container border-solid border-2 border-black">
      <div className="row">
        <div className="column">
          <h1>Sign In</h1>
        </div>
      </div>
      <form>
        <div className="row">
          <div className="column">
            <label>
              Username
              <input
                required
                name="username"
                type="text"
                className="border-solid border-2 rounded-full pl-3"></input>
            </label>
            <label>
              Password
              <input
                required
                name="password"
                type="text"
                className="border-solid border-2 rounded-full pl-3"></input>
            </label>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <button className="bg-gray-300 hover:bg-gray-500 text-black font-bold py-2 px-4 rounded-full">
              Sign In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
