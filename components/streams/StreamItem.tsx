import { Stream } from "@prisma/client";
import Link from "next/link";

interface IStreamItem {
  className?: string;
  stream: Stream;
  [key: string]: any;
}

const StreamItem = ({ className, stream }: IStreamItem) => {
  console.log("stream:", stream);
  return (
    <div className={className}>
      <Link href={`/streams/${stream.id}`}>
        <div className="w-full bg-gray-200 aspect-video rounded-md" />
        <h3 className="font-medium mt-2">{stream.name}</h3>
        <p className="font-sm text-gray-400 mt-0">{stream.description}</p>
      </Link>
    </div>
  );
};

export default StreamItem;
