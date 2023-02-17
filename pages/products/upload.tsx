import { Button, Input, Layout, Textarea, Uploader } from "@components/shared";
import { useMutation } from "@libs/client";
import { Product } from "@prisma/client";
import { ResponseType } from "@shared/types";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface UploadForm {
  image: string;
  name: string;
  price: number;
  description: string;
}

export interface UploadProductResult extends ResponseType {
  product: Product;
}

const Upload: NextPage = () => {
  const { register, handleSubmit } = useForm<UploadForm>();
  const [upload, { data, loading }] =
    useMutation<UploadProductResult>("/api/products");
  const onValid = (data: UploadForm) => {
    if (loading) {
      return;
    }
    upload(data);
  };
  const router = useRouter();
  useEffect(() => {
    if (data?.ok) {
      router.push(`/`);
    }
  }, [data]);
  return (
    <Layout title="Upload" canGoBack={true} className="p-4">
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
    </Layout>
  );
};

export default Upload;
