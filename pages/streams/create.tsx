import { Button, Input, Layout, Textarea } from "@components/shared";
import { useMutation } from "@libs/client";
import { Stream } from "@prisma/client";
import { ResponseType } from "@shared/types";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface UploadForm {
  name: string;
  price: number;
  description: string;
}

interface CreateLive extends ResponseType {
  stream: Stream;
}

const Create: NextPage = () => {
  const [createStream, { data, loading }] = useMutation<CreateLive>("/api/streams");
  const { register, handleSubmit } = useForm<UploadForm>();
  const onValid = (data: UploadForm) => {
    if (loading) return;
    console.log(data);
    createStream(data);
  };
  const router = useRouter();
  useEffect(() => {
    if (data && data.ok) {
      console.log("ok");
      router.push(`/streams/${data.stream.id}`);
    }
  }, [data]);
  return (
    <Layout title="Create Stream" canGoBack={true} className="p-4">
      <Input template="text" lable="Name" register={register("name", { required: true })} required />
      <Input
        className="mt-4"
        template="price"
        lable="Price"
        register={register("price", { required: true, valueAsNumber: true })}
        required
      />
      <Textarea
        className="mt-4"
        register={register("description", { required: true })}
        label={"Description"}
        requried
      />
      <Button
        className="mt-4"
        onClick={handleSubmit(onValid)}
        label={loading ? "Loading.." : "Upload product"}
      />
    </Layout>
  );
};

export default Create;
