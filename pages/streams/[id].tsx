import { Layout } from "@components/shared";
import { MessageItem, StreamItem } from "@components/streams";
import MessageInput from "@components/streams/MessageInput";
import { useMutation, useUser } from "@libs/client";
import { Stream } from "@prisma/client";
import { ResponseType } from "@shared/types";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { Message } from "twilio/lib/twiml/MessagingResponse";

interface StreamMessage {
  message: string;
  user: {
    id: number;
    avatar?: string | null;
  };
}

interface StreamWithMessages extends Stream {
  messages: StreamMessage[];
}

interface StreamResult extends ResponseType {
  stream: StreamWithMessages;
}

interface MessageForm {
  message: string;
}

const StreamDetail: NextPage = () => {
  const { user } = useUser();
  const { register, handleSubmit, reset } = useForm<MessageForm>();
  const router = useRouter();
  const { data, mutate } = useSWR<StreamResult>(router.query.id ? `/api/streams/${router.query.id}` : null, {
    refreshInterval: 1000,
  });
  const [sendMessage, { loading }] = useMutation<ResponseType>(`/api/streams/${router.query.id}/sendMessage`);
  const onValid = (form: MessageForm) => {
    if (loading) return;
    sendMessage(form);
    reset();
    if (!data || !user) return;
    mutate(
      {
        ...data,
        stream: {
          ...data.stream,
          messages: [
            { user: { id: user.id, avatar: user.avatar }, message: form.message },
            ...data.stream.messages,
          ],
        },
      },
      false
    );
  };
  return (
    <Layout title="Stream Detail" canGoBack={true}>
      {data && data.ok ? (
        <div>
          <StreamItem className={`p-4`} stream={data.stream} />
          <div className="pt-4 px-4 pb-20 space-y-4">
            {data.stream.messages.map((message, index) => (
              <MessageItem text={message.message} key={index} reverse={user?.id === message.user?.id} />
            ))}
          </div>
          <form onSubmit={handleSubmit(onValid)}>
            <MessageInput className="" register={register("message", { required: true })} />
          </form>
        </div>
      ) : null}
    </Layout>
  );
};

export default StreamDetail;
