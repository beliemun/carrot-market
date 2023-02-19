import { Button, Input, Layout, Textarea, Uploader } from "@components/shared";
import { useMutation } from "@libs/client";
import { NextPage } from "next";
import { useForm } from "react-hook-form";

interface IUploadFormProps {
  image: string;
  price: number;
  description: string;
}

const Upload: NextPage = () => {
  const { register, handleSubmit } = useForm<IUploadFormProps>();
  const [upload, { data, loading }] = useMutation("api/products");
  const onValid = (data: IUploadFormProps) => {
    if (loading) {
      return;
    }
    console.log(data);
  };
  return (
    <Layout title="Upload" canGoBack={true}>
      <form className="p-4" onSubmit={handleSubmit(onValid)}>
        <Uploader register={register("image", { required: true })} />
        <Input className="mt-4" template="price" lable="Price" required />
        <Textarea
          className="mt-4"
          register={register("description", { required: true })}
          label={"Description"}
          requried
        />
        <Button
          className="mt-4"
          onSubmit={handleSubmit(onValid)}
          label="Upload product"
        />
      </form>
    </Layout>
  );
};

export default Upload;
