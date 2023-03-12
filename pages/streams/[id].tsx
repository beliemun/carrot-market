import { Layout } from "@components/shared";
import { MessageItem, StreamItem } from "@components/streams";
import MessageInput from "@components/streams/MessageInput";
import { Stream } from "@prisma/client";
import { ResponseType } from "@shared/types";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

interface StreamResult extends ResponseType {
  stream: Stream;
}

interface MessageForm {}

const StreamDetail: NextPage = () => {
  const { register, handleSubmit } = useForm<MessageForm>();
  const router = useRouter();
  const { data } = useSWR<StreamResult>(router.query.id ? `/api/streams/${router.query.id}` : null);
  useEffect(() => {
    if (data && data.ok) {
    }
  }, [data]);
  console.log(data);
  return (
    <Layout title="Stream Detail" canGoBack={true}>
      {data && data.ok ? (
        <div>
          <StreamItem className={`p-4`} stream={data.stream} />

          <div className="pt-4 px-4 pb-20 space-y-4">
            <MessageItem text="Hi nice to meet you! how much are you selling them for?" />
            <MessageItem text="I want ￦20,000" reverse />
          </div>
          <MessageInput className="" register={register} />
        </div>
      ) : null}
    </Layout>
  );
};

export default StreamDetail;
