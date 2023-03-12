import { Stream } from "@prisma/client";
import Link from "next/link";

interface IStreamItem {
  className?: string;
  stream: Stream;
  [key: string]: any;
}

const StreamItem = ({ className, stream }: IStreamItem) => {
  return (
    <div className={className}>
      <div className="w-full bg-gray-200 aspect-video rounded-md" />
      <h3 className="font-medium mt-2">{stream.name}</h3>
      <p className="font-sm text-gray-400 mt-0">{stream.description}</p>
    </div>
  );
};

export default StreamItem;
