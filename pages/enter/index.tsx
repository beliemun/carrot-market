import { TabButton } from "@components/enter";
import { GithubButton, TwiterButton } from "@components/enter";
import { Input } from "@components/shared";
import useMutation from "@libs/client/useMutation";
import { ResponseType } from "@shared/types";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const BS = dynamic(
  //@ts-ignore
  () =>
    new Promise((resolve) =>
      setTimeout(() => {
        resolve(import("./BS"));
      }, 3000)
    ),
  { ssr: false, suspense: true }
);

type LoginMethod = "email" | "phone";

interface EnterForm {
  email?: string;
  phone?: string;
}

interface TokenForm {
  token: string;
}

const Enter: NextPage = () => {
  const [enter, { loading, data }] = useMutation<ResponseType>("/api/users/enter");
  const [confirm, { loading: tokenLoading, data: tokenData }] =
    useMutation<ResponseType>("/api/users/confirm");
  const { register: enterRegister, handleSubmit: enterSubmit, reset } = useForm<EnterForm>();
  const { register: toeknRegister, handleSubmit: tokenSubmit } = useForm<TokenForm>();
  const [method, setMethod] = useState<LoginMethod>("email");
  const handleChangeTab = (type: LoginMethod) => {
    reset();
    setMethod(type);
  };
  const onValid = (fromData: EnterForm) => {
    enter(fromData);
  };
  const onTokenValid = (formData: TokenForm) => {
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
      <h3 className="text-3xl font-bold text-center text-orange-400">Carrot Market</h3>
      <div>
        <div className="col-center">
          <div className={`grid grid-cols-2 w-full border-b border-gray-200 mt-4`}>
            <TabButton method={method} lable={"email"} onClick={() => handleChangeTab("email")} />
            <TabButton method={method} lable={"phone"} onClick={() => handleChangeTab("phone")} />
          </div>
        </div>
        {data?.ok ? (
          <form className="p-4" onSubmit={tokenSubmit(onTokenValid)}>
            <label className="text-sm">Comfirmation Token</label>
            <div className="mt-2">
              <Input
                template="text"
                register={toeknRegister("token")}
                frame="text"
                type="number"
                required
                onSubmit={tokenSubmit(onTokenValid)}
              />
            </div>
            <button className="button mt-4">{tokenLoading ? "Loading" : "Comfirmation Token"}</button>
          </form>
        ) : (
          <form className="p-4" onSubmit={enterSubmit(onValid)}>
            <label className="text-sm">
              {method === "email" ? "Email address" : null}
              {method === "phone" ? "Phone number" : null}
            </label>
            <div className="mt-2">
              {method === "email" ? (
                <Input
                  template="text"
                  register={enterRegister("email")}
                  type="email"
                  frame="text"
                  required
                  onSubmit={enterSubmit(onValid)}
                />
              ) : null}
              {method === "phone" ? (
                <>
                  <Suspense fallback={<div>Loading..</div>}>
                    <BS />
                  </Suspense>
                  <Input
                    template="phone"
                    register={enterRegister("phone")}
                    type="number"
                    frame="price"
                    required
                    onSubmit={enterSubmit(onValid)}
                  />
                </>
              ) : null}
            </div>
            <button className="button mt-4">
              {method === "email" ? (loading ? "Loading" : "Get login link") : null}
              {method === "phone" ? (loading ? "Loading" : "Get one-time password") : null}
            </button>
          </form>
        )}
        <div>
          <div className="py-2">
            <div className="absolute w-full border-t border-gray-200" />
            <div className="relative -top-3 text-center">
              <span className="bg-white px-3 text-gray-400 text-sm">Or enter with</span>
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
