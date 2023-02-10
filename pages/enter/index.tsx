import { TabButton } from "@components/enter";
import { GithubButton, TwiterButton } from "@components/enter";
import { Input } from "@components/shared";
import useMutation from "@libs/client/useMutation";
import { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";

type LoginMethod = "email" | "phone";

interface IFormProps {
  email?: string;
  phone?: string;
}

const Enter: NextPage = () => {
  const [enter, { loading, data, error }] = useMutation("/api/users/enter");
  const { register, handleSubmit, reset } = useForm<IFormProps>();
  const [method, setMethod] = useState<LoginMethod>("email");
  const handleChangeTab = (type: LoginMethod) => {
    reset();
    setMethod(type);
  };
  const onValid = (data: IFormProps) => {
    enter(data);
  };
  console.log(loading, data, error);
  return (
    <div className="my-6">
      <h3 className="text-3xl font-bold text-center text-orange-400">
        Carrot Market
      </h3>
      <div>
        <div className="col-center">
          <div
            className={`grid grid-cols-2 w-full border-b border-gray-200 mt-4`}
          >
            <TabButton
              method={method}
              lable={"email"}
              onClick={() => handleChangeTab("email")}
            />
            <TabButton
              method={method}
              lable={"phone"}
              onClick={() => handleChangeTab("phone")}
            />
          </div>
        </div>
        <form className="p-4" onSubmit={handleSubmit(onValid)}>
          <label className="text-sm">
            {method === "email" ? "Email address" : null}
            {method === "phone" ? "Phone number" : null}
          </label>
          <div className="mt-2">
            {method === "email" ? (
              <Input
                register={register("email")}
                frame="text"
                required
                onSubmit={handleSubmit(onValid)}
              />
            ) : null}
            {method === "phone" ? (
              <Input
                register={register("phone")}
                frame="price"
                required
                onSubmit={handleSubmit(onValid)}
              />
            ) : null}
          </div>
          <button className="button mt-4">
            {method === "email"
              ? loading
                ? "Loading"
                : "Get login link"
              : null}
            {method === "phone" ? "Get one-time password" : null}
          </button>
        </form>
        <div>
          <div className="py-2">
            <div className="absolute w-full border-t border-gray-200" />
            <div className="relative -top-3 text-center">
              <span className="bg-white px-3 text-gray-400 text-sm">
                Or enter with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 px-4">
            <TwiterButton />
            <GithubButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enter;
