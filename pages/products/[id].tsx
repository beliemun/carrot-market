import { LikeButton } from "@components/product";
import { Layout, ProfileSection } from "@components/shared";
import { useMutation, useUser } from "@libs/client";
import { getDeliveryUrl } from "@libs/client/utils";
import { Product, User } from "@prisma/client";
import { ResponseType } from "@shared/types";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";

interface ProductWithUser extends Product {
  user: User | undefined;
}

interface ProductResult extends ResponseType {
  product: ProductWithUser;
  relatedProducts: Product[];
  isLiked: boolean;
}

const Detail: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  // const { mutate: unboundMutate } = useSWRConfig();
  const { data, mutate: boundMutate } = useSWR<ProductResult>(
    router.query.id ? `/api/products/${router.query.id}` : null
  );
  const [toggleLike, { loading }] = useMutation(`/api/products/${router.query.id}/favorite`);
  const handleToggleLike = () => {
    if (loading || !data) return;
    toggleLike({});
    boundMutate({ ...data, isLiked: !data.isLiked }, false);
    // unboundMutate("/api/users/me", (prev: any) => ({ ok: !prev.ok }), false);
  };
  return (
    <Layout title="Detail" canGoBack={true}>
      <div className="p-4">
        <div>
          {data?.product?.image ? (
            <div className="relative p-32">
              <Image
                // priority={true}
                alt="Product Image"
                className="bg-gray-200 rounded-md object-cover"
                fill
                placeholder="blur"
                blurDataURL={getDeliveryUrl(data.product.image, "thumbnail")}
                src={getDeliveryUrl(data.product.image, "public")}
                quality={100}
              />
            </div>
          ) : (
            <div className="h-60 bg-gray-200 rounded-md" />
          )}
          <div className="flex flex-row items-center border-b border-gray-200 w-full mb-2 py-3 cursor-pointer">
            {user ? (
              <ProfileSection name={user.name} avatar={user.avatar} title={"View Profile"} url={"/profile"} />
            ) : null}
          </div>
          <div>
            <h1 className="text-3xl font-bold mt-4">{data?.product.name}</h1>
            <p className="text-2xl mt-1">${data?.product.price}</p>
            <p className="text-gray-600 mt-4">{data?.product.description}</p>
            <div className="flex justify-between mt-4 space-x-4">
              <button className="button">Talk to seller</button>
              <LikeButton onClick={handleToggleLike} isLiked={data?.isLiked} />
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
                <p className="text-xs font-medium text-gray-400">${product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Detail;
