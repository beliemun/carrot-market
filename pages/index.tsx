import { ProductItem } from "@components/home";
import { Layout, UploadButton } from "@components/shared";
import { useUser } from "@libs/client";
import { Product } from "@prisma/client";
import { ResponseType } from "@shared/types";
import type { NextPage } from "next";
import useSWR from "swr";

export interface ProductWithCount extends Product {
  _count: {
    favorites: number;
  };
}

export interface ProductsResult extends ResponseType {
  products: ProductWithCount[];
}

const Home: NextPage = () => {
  const { user } = useUser();
  const { data } = useSWR<ProductsResult>("/api/products");
  console.log("data:", data);
  return (
    <Layout title="Home" hasTabBar={true}>
      <div className="flex flex-col divide-y">
        {data?.products?.map((product, i) => (
          <ProductItem
            key={i}
            {...product}
            likeCount={product._count.favorites}
          />
        ))}
        <UploadButton url="/products/upload" type="Product" />
      </div>
    </Layout>
  );
};

export default Home;
