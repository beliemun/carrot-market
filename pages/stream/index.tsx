import { Layout, UploadButton } from "@components/shared";
import { useUser } from "@libs/client";
import { NextPage } from "next";
import Link from "next/link";

const Stream: NextPage = () => {
  const { user } = useUser();
  return (
    <Layout title="Stream" canGoBack={true} hasTabBar={true}>
      <div>
        <div className="divide-y">
          {[...Array(10)].map((_, i) => (
            <div className="p-4" key={i}>
              <div className="w-full bg-gray-200 aspect-video rounded-md" />
              <h3 className="font-medium mt-2">Let's try potatos</h3>
            </div>
          ))}
        </div>
        <UploadButton type="Stream" url="stream/create" />
      </div>
    </Layout>
  );
};

export default Stream;
