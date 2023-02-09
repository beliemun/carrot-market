import { Layout } from "@components/shared";
import type { NextPage } from "next";
import Link from "next/link";

const Community: NextPage = () => {
  return (
    <Layout title={"Community"} canGoBack>
      <div>
        {[...Array(10)].map((_, i) => (
          <div key={i}>
            <div className="flex flex-col items-start p-4 border-b border-gray-100">
              <span className="flex text-xs px-2 py-1 bg-gray-100 rounded-full">
                동네질문
              </span>
              <div className="mt-2">
                <span className="text-orange-400">Q.</span> What is the best
                mandu restaurant?
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
          </div>
        ))}
        <Link
          href={"community/write"}
          className="fixed bottom-8 right-8 bg-orange-400 hover:bg-orange-500 t-300 rounded-full p-3 text-white shadow-black/20 shadow-xl"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            ></path>
          </svg>
        </Link>
      </div>
    </Layout>
  );
};

export default Community;
