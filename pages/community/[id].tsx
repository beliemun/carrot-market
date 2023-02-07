import type { NextPage } from "next";

const CommunityPostDetail: NextPage = () => {
  return (
    <div>
      <div className="flex flex-col items-start px-4 mt-4">
        <span className="flex text-xs px-2 py-1 bg-gray-100 rounded-full">
          동네질문
        </span>
      </div>
      <div className="flex flex-row items-center px-4 border-b border-gray-100 w-full py-3 cursor-pointer">
        <div className="w-10 h-10 bg-gray-200 rounded-full mr-4" />
        <div>
          <p className="font-medium">Steve Jebs</p>
          <p className="text-sm font-medium text-gray-400">
            View profile &rarr;
          </p>
        </div>
      </div>
      <div className="flex flex-col items-start px-4 border-b border-gray-100 py-2">
        <div>
          <span className="text-orange-400">Q.</span> What is the best mandu
          restaurant?
        </div>
        <div className="flex justify-between w-full text-sm text-gray-400 my-2">
          <span>니꼬</span>
          <span>18시간 전</span>
        </div>
        <div className="flex space-x-4">
          <span className="row-center space-x-1 hover:bg-orange-400 hover:text-white px-2 py-1 rounded-full cursor-pointer t-300">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span className="text-sm">궁금해요 1</span>
          </span>
          <span className="row-center space-x-1 hover:bg-orange-400 hover:text-white px-2 py-1 rounded-full cursor-pointer t-300">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
            <span className="text-sm">답변 1</span>
          </span>
        </div>
      </div>
      <div className="p-4 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex">
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
            <div className="flex flex-col ml-2 space-y-">
              <span className="text-sm font-medium">Steve Jebs</span>
              <span className="text-xs font-medium text-gray-400">
                2시간 전
              </span>
              <p className="text-sm text-gray-600">
                The best mandu restaurant is the one next to my house.
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="px-4">
        <textarea
          className="input"
          rows={4}
          placeholder="Answer this question!"
        />
        <button className="button mt-2">Reply</button>
      </div>
    </div>
  );
};

export default CommunityPostDetail;
