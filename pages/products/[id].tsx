import { Layout } from "@components/shared";
import { NextPage } from "next";

const Detail: NextPage = () => {
  return (
    <Layout title="Detail" canGoBack={true}>
      <div className="p-4">
        <div>
          <div className="h-96 bg-gray-200 rounded-md" />
          <div className="flex flex-row items-center border-b border-gray-100 w-full mb-2 py-3 cursor-pointer">
            <div className="w-10 h-10 bg-gray-200 rounded-full mr-4" />
            <div>
              <p className="font-medium">Steve Jebs</p>
              <p className="text-sm font-medium text-gray-400">
                View profile &rarr;
              </p>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold mt-4">Galaxy S50</h1>
            <p className="text-2xl mt-1">$140</p>
            <p className="text-gray-600 mt-4">
              My money&apos;s in that office, right? If she start giving me some
              bullshit about it ain&apos;t there, and we got to go someplace
              else and get it, I&apos;m gonna shoot you in the head then and
              there. Then I&apos;m gonna shoot that bitch in the kneecaps, find
              out where my goddamn money is. She gonna tell me too. Hey, look at
              me when I&apos;m talking to you, motherfucker. You listen: we go
              in there, and that ni**a Winston or anybody else is in there, you
              the first motherfucker to get shot. You understand?
            </p>
            <div className="flex justify-between mt-4 space-x-4">
              <button className="button">Talk to seller</button>
              <button className="col-center rounded-full text-gray-400 hover:bg-red-400 hover:text-white t-300 p-4">
                <svg
                  className="h-6 w-6 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mt-6 mb-2">Similar items</h2>
          <div className="grid grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div className="" key={i}>
                <div className="w-full h-32 rounded-md bg-gray-200" />
                <h3 className="text-sm font-medium mt-1">Galaxy S60</h3>
                <p className="text-xs font-medium text-gray-400">${i * 10}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Detail;
