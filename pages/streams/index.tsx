import { Layout, UploadButton } from "@components/shared";
import { StreamItem } from "@components/streams";
import { useUser } from "@libs/client";
import { Stream } from "@prisma/client";
import { ResponseType } from "@shared/types";
import { NextPage } from "next";
import useSWR from "swr";

interface StreamResult extends ResponseType {
  streams: Stream[];
}

const Stream: NextPage = () => {
  const { user } = useUser();
  const { data } = useSWR<StreamResult>("/api/streams");
  return (
    <Layout title="Streams" hasTabBar={true}>
      <div className="p-4">
        <div className="divide-y">
          {data?.streams.map((stream, index) => (
            <StreamItem className={`p-40`} stream={stream} key={index} />
          ))}
        </div>
        <UploadButton type="Stream" url="streams/create" />
      </div>
    </Layout>
  );
};

export default Stream;
