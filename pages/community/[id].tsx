import { Layout } from "@components/shared";
import { useMutation } from "@libs/client";
import { Answer, Post, User } from "@prisma/client";
import { ResponseType } from "@shared/types";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
interface AnswerWithUser extends Answer {
  user: User;
}

interface PostWithUser extends Post {
  user: User;
  answers: AnswerWithUser[];
  _count: {
    answers: number;
    interests: number;
  };
}

interface PostResult extends ResponseType {
  post: PostWithUser;
  isInterestedIn: boolean;
}

interface AnswerForm {
  answer: string;
}

interface AnswerResponse {
  ok: boolean;
  answer: Answer;
}

const CommunityPostDetail: NextPage = () => {
  const router = useRouter();
  const { data, mutate } = useSWR<PostResult>(router.query.id ? `/api/posts/${router.query.id}` : null);
  const [toggleInterest, { loading: interestLoading }] = useMutation(`/api/posts/${router.query.id}/interest`);
  const [sendAnswer, { data: answerData, loading: sendAnswerLoading }] = useMutation<AnswerResponse>(
    `/api/posts/${router.query.id}/answer`
  );
  const { register, handleSubmit, reset } = useForm<AnswerForm>();
  const handleToggleInterest = () => {
    if (!data) return;
    toggleInterest({ id: router.query.id });
    if (interestLoading) return;
    mutate(
      {
        ...data,
        post: {
          ...data.post,
          _count: {
            ...data.post._count,
            interests: data.isInterestedIn ? data.post._count.interests - 1 : data.post._count.interests + 1,
          },
        },
        isInterestedIn: !data.isInterestedIn,
      },
      false
    );
  };
  const onValid = (data: AnswerForm) => {
    if (sendAnswerLoading) return;
    sendAnswer(data);
  };
  useEffect(() => {
    if (answerData && answerData.ok) {
      reset();
      mutate();
    }
  }, [answerData, reset]);
  return (
    <Layout title={"Community Detail"} canGoBack={true}>
      <div>
        <div className="flex flex-col items-start px-4 mt-4">
          <span className="flex text-xs px-2 py-1 bg-gray-100 rounded-full">동네질문</span>
        </div>
        <div className="flex flex-row items-center px-4 border-b border-gray-200 w-full py-3 cursor-pointer">
          <div className="w-10 h-10 bg-gray-200 rounded-full mr-4" />
          <div>
            <p className="font-medium">{data?.post?.user.name}</p>
            <Link href={`/users/profiles/${data?.post?.user.id}`} className="text-sm font-medium text-gray-400">
              View profile &rarr;
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-start px-4 border-b border-gray-200 py-2">
          <div>
            <span className="text-orange-400">Q. </span>
            {data?.post?.question}
          </div>
          <div className="flex space-x-4 mt-2">
            <button
              onClick={handleToggleInterest}
              disabled={interestLoading}
              className={`row-center space-x-1 hover:bg-orange-400 hover:text-white px-2 py-1 rounded-full cursor-pointer t-300 ${
                data?.isInterestedIn && "text-orange-400"
              }`}
            >
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span className={`text-sm`}>{`궁금해요 ${data?.post._count.interests}`}</span>
            </button>
            <span className="row-center space-x-1 hover:bg-orange-400 hover:text-white px-2 py-1 rounded-full cursor-pointer t-300">
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
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span className="text-sm">{`답변 ${data?.post._count.answers}`}</span>
            </span>
          </div>
        </div>
        <div className="p-4 space-y-4">
          {data?.post?.answers.map((answer, i) => (
            <div key={i} className="flex">
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
              <div className="flex flex-col ml-2 space-y-">
                <span className="text-sm font-medium">{answer.user.name}</span>
                <p className="text-sm text-gray-600">{answer.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit(onValid)} className="px-4">
          <textarea
            className="input"
            rows={4}
            placeholder="Answer this question!"
            {...register("answer", { required: true, minLength: 5 })}
          />
          <button className="button mt-2">Reply</button>
        </form>
      </div>
    </Layout>
  );
};

export default CommunityPostDetail;
