import { ProductItem } from "@components/home";
import RecordItem from "@components/profile";
import { Layout } from "@components/shared";
import { RecordResult } from "@shared/types";
import { NextPage } from "next";
import useSWR from "swr";

const Sale: NextPage = () => {
  const { data } = useSWR<RecordResult>(`/api/users/me/sale`);
  return (
    <Layout title={"판매 내역"} canGoBack={true}>
      <div className="flex flex-col divide-y">
        {data?.records?.map((record, index) => (
          <RecordItem {...record.product} likeCount={Number(record.product._count.records)} key={index} />
        ))}
      </div>
    </Layout>
  );
};

export default Sale;
