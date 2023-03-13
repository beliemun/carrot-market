import { TabButton } from "@components/enter";
import { GithubButton, TwiterButton } from "@components/enter";
import { Input } from "@components/shared";
import { useUser } from "@libs/client";
import useMutation from "@libs/client/useMutation";
import { IResponseProps } from "@shared/types";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type LoginMethod = "email" | "phone";

interface IEnterFormProps {
  email?: string;
  phone?: string;
}

interface ITokenFormProps {
  token: string;
}

const Enter: NextPage = () => {
  const [enter, { loading, data, error }] =
    useMutation<IResponseProps>("/api/users/enter");
  const [confirm, { loading: tokenLoading, data: tokenData }] =
    useMutation<IResponseProps>("/api/users/confirm");
  const { register, handleSubmit, reset } = useForm<IEnterFormProps>();
  const { register: toeknRegister, handleSubmit: tokenHandleSubmit } =
    useForm<ITokenFormProps>();
  const [method, setMethod] = useState<LoginMethod>("email");
  const handleChangeTab = (type: LoginMethod) => {
    reset();
    setMethod(type);
  };
  const onValid = (fromData: IEnterFormProps) => {
    enter(fromData);
  };
  const onTokenValid = (formData: ITokenFormProps) => {
    confirm(formData);
  };
  const router = useRouter();
  useEffect(() => {
    if (tokenData === undefined) return;
    const { ok, error } = tokenData;
    if (ok) {
      router.push("/");
    } else {
      alert(error);
    }
  }, [tokenData, router]);
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
        {data?.ok ? (
          <form className="p-4" onSubmit={tokenHandleSubmit(onTokenValid)}>
            <label className="text-sm">Comfirmation Token</label>
            <div className="mt-2">
              <Input
                template="text"
                register={toeknRegister("token")}
                frame="text"
                type="number"
                required
                onSubmit={tokenHandleSubmit(onTokenValid)}
              />
            </div>
            <button className="button mt-4">
              {tokenLoading ? "Loading" : "Comfirmation Token"}
            </button>
          </form>
        ) : (
          <form className="p-4" onSubmit={handleSubmit(onValid)}>
            <label className="text-sm">
              {method === "email" ? "Email address" : null}
              {method === "phone" ? "Phone number" : null}
            </label>
            <div className="mt-2">
              {method === "email" ? (
                <Input
                  template="text"
                  register={register("email")}
                  type="email"
                  frame="text"
                  required
                  onSubmit={handleSubmit(onValid)}
                />
              ) : null}
              {method === "phone" ? (
                <Input
                  template="phone"
                  register={register("phone")}
                  type="number"
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
              {method === "phone"
                ? loading
                  ? "Loading"
                  : "Get one-time password"
                : null}
            </button>
          </form>
        )}
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
