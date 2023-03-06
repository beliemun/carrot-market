import { Layout } from "@components/shared";
import { useMutation } from "@libs/client";
import { Post } from "@prisma/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface WriteForm {
  question: string;
}

export interface WriteResponse {
  ok: boolean;
  post: Post;
}

const Write: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<WriteForm>();
  const [post, { loading, data }] = useMutation<WriteResponse>("/api/posts");
  const onValid = (data: WriteForm) => {
    if (loading) return;
    post(data);
  };
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/community/${data.post.id}`);
    }
  }, [data]);
  return (
    <Layout title="Write" canGoBack={true}>
      <form className="p-4" onSubmit={handleSubmit(onValid)}>
        <textarea className="input" {...register("question")} />
        <button className="button mt-2">{loading ? "Loading" : "Submit"}</button>
      </form>
    </Layout>
  );
};

export default Write;
