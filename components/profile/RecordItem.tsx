import { getDeliveryUrl } from "@libs/client/utils";
import { Product } from "@prisma/client";
import Link from "next/link";

const RecordItem = ({ image, id, name, price, description, likeCount }: Product & { likeCount: number }) => {
  return (
    <Link className="flex p-4 cursor-pointer" href={`/products/${id}`}>
      <div className="flex w-full items-center space-x-4">
        {image ? (
          <img src={getDeliveryUrl(image, "avatar")} className="w-20 h-20 rounded-md" />
        ) : (
          <div className="w-20 h-20 bg-gray-200 rounded-md" />
        )}
        <div className="flex flex-col">
          <h3 className="font-medium">{name}</h3>
          <span className="text-sm text-gray-400">
            {description.length > 40 ? description.slice(0, 40) + "..." : description}
          </span>
          <span className="font-medium mt-2">${price}</span>
        </div>
      </div>
      {likeCount > 0 ? (
        <div className="flex items-end space-x-4">
          <div className="row-center space-x-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="w-4 h-4">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            <span className="text-sm">{likeCount}</span>
          </div>
        </div>
      ) : null}
    </Link>
  );
};

export default RecordItem;
