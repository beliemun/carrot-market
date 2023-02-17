import { Layout } from "@components/shared";
import { Product, User } from "@prisma/client";
import { ResponseType } from "@shared/types";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

interface ProductWithUser extends Product {
  user: User;
}

interface ProductResult extends ResponseType {
  product: ProductWithUser;
  relatedProducts: Product[];
}

const Detail: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<ProductResult>(
    router.query.id ? `/api/products/${router.query.id}` : null
  );
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <Layout title="Detail" canGoBack={true}>
      <div className="p-4">
        <div>
          <div className="h-96 bg-gray-200 rounded-md" />
          <div className="flex flex-row items-center border-b border-gray-100 w-full mb-2 py-3 cursor-pointer">
            <div className="p-6 bg-gray-200 rounded-full mr-4" />
            <div className="w-full">
              <p className="font-medium">{data?.product?.user.name}</p>
              <p className="text-sm font-medium text-gray-400">
                View profile &rarr;
              </p>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold mt-4">{data?.product.name}</h1>
            <p className="text-2xl mt-1">${data?.product.price}</p>
            <p className="text-gray-600 mt-4">{data?.product.description}</p>
            <div className="flex justify-between mt-4 space-x-4">
              <button className="button">Talk to seller</button>
              <button className="col-center rounded-full text-gray-400 hover:bg-red-400 hover:text-white t-300 p-4">
                <svg
                  className="h-6 w-6 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mt-6 mb-2">Similar items</h2>
          <div className="grid grid-cols-2 gap-4">
            {data?.relatedProducts.map((product, i) => (
              <div className="" key={i}>
                <div className="w-full h-32 rounded-md bg-gray-200" />
                <h3 className="text-sm font-medium mt-1">{product.name}</h3>
                <p className="text-xs font-medium text-gray-400">
                  ${product.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Detail;
