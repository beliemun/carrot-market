import { Layout } from "@components/shared";
import { NextPage } from "next";

const Chats: NextPage = () => {
  return (
    <Layout title="Chats" canGoBack={true}>
      <div className="divide-y">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex flex-row items-center w-full py-3 cursor-pointer px-4"
          >
            <div className="w-10 h-10 bg-gray-200 rounded-full mr-4" />
            <div>
              <p className="font-medium">Steve Jebs</p>
              <p className="text-sm font-medium text-gray-400">Hello world</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
