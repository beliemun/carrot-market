import { Button, Input, Layout, Textarea } from "@components/shared";
import { useMutation } from "@libs/client";
import { NextPage } from "next";
import { useForm } from "react-hook-form";

interface UploadForm {
  name: string;
  price: number;
  description: string;
}

const Create: NextPage = () => {
  const [upload, { loading }] = useMutation("");
  const { register, handleSubmit } = useForm<UploadForm>();
  const onValid = (data: UploadForm) => {
    if (loading) {
      return;
    }
    upload(data);
  };
  return (
    <Layout title="Create Stream" canGoBack={true} className="p-4">
      <Input template="text" lable="Name" register={register("name")} required />
      <Input className="mt-4" template="price" lable="Price" register={register("price")} required />
      <Textarea
        className="mt-4"
        register={register("description", { required: true })}
        label={"Description"}
        requried
      />
      <Button className="mt-4" onClick={handleSubmit(onValid)} label="Upload product" />
    </Layout>
  );
};

export default Create;
