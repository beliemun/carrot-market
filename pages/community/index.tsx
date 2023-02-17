import { CommunityItem } from "@components/community";
import { Layout, UploadButton } from "@components/shared";
import { useUser } from "@libs/client";
import type { NextPage } from "next";
import Link from "next/link";

const Community: NextPage = () => {
  const { user } = useUser();
  console.log(user);
  return (
    <Layout title={"Community"} hasTabBar={true}>
      {[...Array(10)].map((_, i) => (
        <CommunityItem key={i} />
      ))}
      <UploadButton url="community/write" type="Commmunity" />
    </Layout>
  );
};

export default Community;
