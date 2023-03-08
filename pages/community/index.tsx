import { CommunityItem } from "@components/community";
import { Layout, UploadButton } from "@components/shared";
import { useUser } from "@libs/client";
import useCoords from "@libs/client/useCoords";
import { Post, User } from "@prisma/client";
import type { NextPage } from "next";
import useSWR from "swr";

export interface PostWithUser extends Post {
  user: User;
}

export interface PostWithCount extends PostWithUser {
  _count: {
    answers: number;
    interests: number;
  };
}

interface PostsResponse {
  ok: boolean;
  posts: PostWithCount[];
}

const Community: NextPage = () => {
  const { user } = useUser();
  const { latitude, longitude } = useCoords();
  const { data } = useSWR<PostsResponse>(
    latitude && longitude ? `/api/posts?latitude=${latitude}&longitude=${longitude}` : null
  );
  return (
    <Layout title={"Community"} hasTabBar={true}>
      {data?.posts.map((post, i) => (
        <CommunityItem key={i} post={post} />
      ))}
      <UploadButton url="community/write" type="Commmunity" />
    </Layout>
  );
};

export default Community;
