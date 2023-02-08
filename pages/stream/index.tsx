import { NextPage } from "next";

const Stream: NextPage = () => {
  return (
    <div className="">
      <div className="divide-y">
        {[...Array(10)].map((_, i) => (
          <div className="p-4" key={i}>
            <div className="w-full bg-gray-200 aspect-video rounded-md" />
            <h3 className="font-medium mt-2">Let's try potatos</h3>
          </div>
        ))}
      </div>
      <button className="fixed bottom-8 right-8 bg-orange-400 hover:bg-orange-500 t-300 rounded-full p-3 text-white shadow-black/20 shadow-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Stream;
