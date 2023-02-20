import { Product } from "@prisma/client";
import Link from "next/link";

const ProductItem = ({
  id,
  name,
  price,
  description,
  likeCount,
}: Product & { likeCount: number }) => {
  return (
    <Link className="flex p-4 cursor-pointer" href={`/products/${id}`}>
      <div className="flex w-full items-center space-x-4">
        <div className="w-20 h-20 bg-gray-200 rounded-md" />
        <div className="flex flex-col">
          <h3 className="font-medium">{name}</h3>
          <span className="text-sm text-gray-400">
            {description.length > 40
              ? description.slice(0, 40) + "..."
              : description}
          </span>
          <span className="font-medium mt-2">${price}</span>
        </div>
      </div>
      <div className="flex items-end space-x-4">
        <div className="row-center space-x-1">
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
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
          <span>{likeCount}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
