export default function Header() {
  return (
    <>
      <div className="header mt-2">
        <div className="w-full">
          <div className="flex items-baseline">
            <h1 className="text-5xl basis-11/12 ml-5">Street Moda</h1>
            <div className="basis-1/3 ml-10">
              <button className="">SELL</button>
            </div>
            <div className="basis-1/3">
              <button className="border-solid border-4 py-2 px-4">LOGIN</button>
            </div>
            <div className="basis-1/3">
              <button className="border-solid border-4 py-2 px-4">
                SIGN UP
              </button>
            </div>
          </div>
        </div>
        <div className="bg-gray-300 mt-3">backgroundcolor</div>
      </div>
    </>
  );
}
