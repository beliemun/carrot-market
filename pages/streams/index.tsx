import { Layout, UploadButton } from "@components/shared";
import ArrowButton from "@components/shared/ArrowButton";
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
  const handleClick = (direction: "PREV" | "NEXT") => {
    console.log("clicked", direction);
  };
  return (
    <Layout title="Streams" hasTabBar={true}>
      <div className={`flex justify-between pt-4 px-4`}>
        <ArrowButton type="PREV" onClick={() => handleClick("PREV")} />
        <ArrowButton type="NEXT" onClick={() => handleClick("NEXT")} />
      </div>
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
