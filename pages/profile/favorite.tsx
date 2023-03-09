import RecordItem from "@components/profile";
import { Layout } from "@components/shared";
import { RecordResult } from "@shared/types";
import { NextPage } from "next";
import useSWR from "swr";

const Interested: NextPage = () => {
  const { data } = useSWR<RecordResult>(`/api/users/me/favorite`);
  return (
    <Layout title={"관심 목록"} canGoBack={true}>
      <div className="flex flex-col divide-y">
        {data?.records?.map((record, index) => (
          <RecordItem {...record.product} likeCount={Number(record.product._count.records)} key={index} />
        ))}
      </div>
    </Layout>
  );
};

export default Interested;
