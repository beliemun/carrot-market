import moment from "moment";
import Link from "next/link";
import { PostWithCount } from "pages/community";

interface ICommunityItem {
  post: PostWithCount;
}

const CommunityItem = ({ post }: ICommunityItem) => {
  return (
    <Link href={`/community/${post.id}`}>
      <div className="flex flex-col items-start p-4 border-b border-gray-200 hover:bg-orange-200">
        <span className="flex text-xs px-2 py-1 bg-gray-100 rounded-full">동네질문</span>
        <div className="mt-2">
          <span className="text-orange-400">Q. </span>
          {post.question}
        </div>
        <div className="flex justify-between w-full text-sm text-gray-400 my-2">
          <span>{post?.user?.name}</span>
          <span>{post.createdAt.toString()}</span>
        </div>
        <div className="flex space-x-4 mt-2">
          <span className="row-center space-x-1 px-2 py-1 rounded-full cursor-pointer t-300">
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
            <span className="text-sm">{`궁금해요 ${post._count.interests}`}</span>
          </span>
          <span className="row-center space-x-1 px-2 py-1 rounded-full cursor-pointer t-300">
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
            <span className="text-sm">{`답변 ${post._count.answers}`}</span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CommunityItem;
