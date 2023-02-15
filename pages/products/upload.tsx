import { Layout } from "@components/shared";
import useMutation from "@libs/client/useMutation";
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
        <div className="col-center h-48 border-2 border-gray-200 hover:border-orange-400 text-gray-400 hover:text-orange-400 border-dashed rounded-md cursor-pointer">
          <div>
            <label>
              <svg
                className="h-12 w-12"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                className="hidden"
                type="file"
                {...register("image", { required: true })}
                required
              />
            </label>
          </div>
        </div>
        <div className="relative mt-4">
          <label className="font-medium text-sm text-gray-400">Price</label>
          <div className="flex items-center">
            <div className="absolute left-3">
              <span>$</span>
            </div>
            <input
              className="input pl-7"
              type="number"
              placeholder="0.00"
              required
              {...register("price", { required: true })}
            />
            <div className="absolute right-3">
              <span>USD</span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label className="font-medium text-sm text-gray-400">
            Description
          </label>
          <div>
            <textarea
              className="input"
              rows={4}
              required
              {...register("description", { required: true })}
            />
          </div>
        </div>
        <button className="button mt-4" onSubmit={handleSubmit(onValid)}>
          Upload product
        </button>
      </form>
    </Layout>
  );
};

export default Upload;
