import { Button, Input, Layout, Textarea, Uploader } from "@components/shared";
import { useMutation } from "@libs/client";
import { Products } from "@prisma/client";
import { MutationResult } from "@shared/types";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface IUploadFormProps {
  image: string;
  name: string;
  price: number;
  description: string;
}

export interface IUploadMutationResult extends MutationResult {
  product: Products;
}

const Upload: NextPage = () => {
  const { register, handleSubmit } = useForm<IUploadFormProps>();
  const [upload, { data, loading }] =
    useMutation<IUploadMutationResult>("/api/products");
  const onValid = (data: IUploadFormProps) => {
    if (loading) {
      return;
    }
    upload(data);
  };
  const router = useRouter();
  useEffect(() => {
    if (data?.ok) {
      const { product } = data;
      console.log("data", data);
      router.push(`/products/${product.id}`);
    }
  }, [data]);
  return (
    <Layout title="Upload" canGoBack={true}>
      <form className="p-4" onSubmit={handleSubmit(onValid)}>
        <Uploader register={register("image")} />
        <Input
          className="mt-4"
          template="text"
          lable="Name"
          register={register("name")}
          required
        />
        <Input
          className="mt-4"
          template="price"
          lable="Price"
          register={register("price")}
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
          label="Upload product"
        />
      </form>
    </Layout>
  );
};

export default Upload;
