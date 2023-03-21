import { Button, Input, Layout, Textarea, Uploader } from "@components/shared";
import { useMutation, useUser } from "@libs/client";
import { Product } from "@prisma/client";
import { ResponseType } from "@shared/types";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
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
  const { user } = useUser();
  const { register, handleSubmit, watch } = useForm<UploadForm>();
  const [upload, { data, loading }] = useMutation<UploadProductResult>("/api/products");
  const onValid = async (form: UploadForm) => {
    if (loading) {
      return;
    }
    if (form && form.image.length > 0 && user) {
      const { uploadURL } = await (await fetch(`/api/files`, { method: "POST" })).json();
      const data = new FormData();
      data.append("file", image[0], form.name);
      const {
        result: { id },
      } = await (await fetch(uploadURL, { method: "POST", body: data })).json();
      form;
      upload({ ...form, image: id });
    } else {
      upload({ ...form, image: "" });
    }
  };
  const router = useRouter();
  useEffect(() => {
    if (data?.ok) {
      router.push(`/`);
    }
  }, [data]);
  const fileRef = useRef<string | null>(null);
  const image = watch("image");
  const [imagePreview, setPhotoPreview] = useState<string>();
  useEffect(() => {
    if (image && image.length > 0) {
      fileRef.current = image[0];
      setPhotoPreview(URL.createObjectURL(fileRef.current as any));
    }
  }, [image]);
  useEffect(() => {
    return () => {
      if (fileRef.current) {
        URL.revokeObjectURL(fileRef.current as any);
      }
    };
  }, []);
  return (
    <Layout title="Upload" canGoBack={true} className="p-4">
      <Uploader
        accept="image/*"
        imagePreview={imagePreview}
        register={register("image")}
        setPhotoPreview={setPhotoPreview}
        required
      />
      <Input className="mt-4" template="text" lable="Name" register={register("name")} required />
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

export default Upload;
