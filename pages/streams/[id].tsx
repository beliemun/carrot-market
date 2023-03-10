import { Layout } from "@components/shared";
import { StreamItem } from "@components/streams";
import { Stream } from "@prisma/client";
import { ResponseType } from "@shared/types";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

interface StreamResult extends ResponseType {
  stream: Stream;
}

const StreamDetail: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR(router.query.id ? `/api/streams/${router.query.id}` : null);
  useEffect(() => {
    if (data && data.ok) {
    }
  }, [data]);
  console.log(data);
  return (
    <Layout title="Stream Detail" canGoBack={true}>
      {data && data.ok ? (
        <div>
          <StreamItem className={`p-4`} stream={data.stream} />
          <div>
            <div className="pt-4 px-4 pb-20 space-y-4">
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
                <div className="w-1/2 border border-gray-200 rounded-md text-sm px-3 py-2">미쳤어</div>
              </div>
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
                <div className="w-1/2 border border-gray-200 rounded-md text-sm px-3 py-2">미쳤어</div>
              </div>
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
                <div className="w-1/2 border border-gray-200 rounded-md text-sm px-3 py-2">미쳤어</div>
              </div>
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
                <div className="w-1/2 border border-gray-200 rounded-md text-sm px-3 py-2">미쳤어</div>
              </div>
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
                <div className="w-1/2 border border-gray-200 rounded-md text-sm px-3 py-2">미쳤어</div>
              </div>
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
                <div className="w-1/2 border border-gray-200 rounded-md text-sm px-3 py-2">미쳤어</div>
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
      ) : null}
    </Layout>
  );
};

export default StreamDetail;
