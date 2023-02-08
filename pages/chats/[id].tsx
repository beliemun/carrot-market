import Layout from "@/components/layout";
import { NextPage } from "next";

const ChatDetail: NextPage = () => {
  return (
    <Layout title="Chat">
      <div>
        <div className="p-4 space-y-4">
          <div className="flex">
            <div className="w-6 h-6 bg-gray-200 rounded-full mr-2" />
            <div className="w-1/2 border border-gray-200 rounded-md text-sm px-3 py-2">
              Hi nice to meet you! how much are you selling them for?
            </div>
          </div>
          <div className="flex flex-row-reverse space-x-2">
            <div className="w-6 h-6 bg-gray-200 rounded-full ml-2" />
            <div className="w-1/2 border border-gray-200 rounded-md text-sm px-3 py-2">
              I want ￦20,000
            </div>
          </div>
          <div className="flex flex-start">
            <div className="w-6 h-6 bg-gray-200 rounded-full mr-2" />
            <div className="w-1/2 border border-gray-200 rounded-md text-sm px-3 py-2">
              미쳤어
            </div>
          </div>
        </div>
        <div className="fixed row-center bottom-4 w-full px-4">
          <input className="input rounded-full pr-10 pl-4" type="text" />
          <div className="absolute right-8 text-orange-400">
            <span>&rarr;</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatDetail;
