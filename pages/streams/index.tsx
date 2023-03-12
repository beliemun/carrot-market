import { Layout, UploadButton } from "@components/shared";
import { StreamItem } from "@components/streams";
import { useUser } from "@libs/client";
import { Stream } from "@prisma/client";
import { ResponseType } from "@shared/types";
import { NextPage } from "next";
import Link from "next/link";
import useSWR from "swr";

interface StreamResult extends ResponseType {
  streams: Stream[];
}

const Stream: NextPage = () => {
  const { user } = useUser();
  const { data } = useSWR<StreamResult>("/api/streams");
  return (
    <Layout title="Streams" hasTabBar={true}>
      <div>
        <div className="divide-y">
          {data?.streams.map((stream, index) => (
            <Link href={`/streams/${stream.id}`} key={index}>
              <StreamItem className={`p-4`} stream={stream} untouchable />
            </Link>
          ))}
        </div>
        <UploadButton type="Stream" url="streams/create" />
      </div>
    </Layout>
  );
};

export default Stream;
