import { Layout } from "@components/shared";
import { useMutation, useUser } from "@libs/client";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

interface EditProfileForm {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  error: String;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}

const EditProfile = () => {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<EditProfileForm>();
  const [editProfile, { data, loading }] = useMutation<EditProfileResponse>(`/api/users/me`);
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok) {
      setError("error", { message: data.error });
    }
    if (data && data.ok) {
      router.replace("/profile");
    }
  }, [data]);
  const onValid = (form: EditProfileForm) => {
    if (loading) return;
    const { name, email, phone } = form;
    if (name === "" && email === "" && phone === "") {
      setError("error", { message: "Name or Email or Phone number are required." });
    } else {
      // editProfile(form);
      console.log(form);
    }
  };
  const fileRef = useRef<string | null>(null);
  const avatar = watch("avatar");
  const [avatarPreview, setAvatarPreview] = useState<string>();
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      fileRef.current = avatar[0];
      setAvatarPreview(URL.createObjectURL(fileRef.current as any));
    }
  }, [avatar]);
  useEffect(() => {
    return () => {
      if (fileRef.current) {
        console.log("clear");
        URL.revokeObjectURL(fileRef.current as any);
      }
    };
  }, []);
  return user ? (
    <Layout title={"프로필 수정"} canGoBack={true}>
      <form className="p-4" onSubmit={handleSubmit(onValid)}>
        <div className="flex items-center space-x-4">
          <img src={avatarPreview} className="w-14 h-14 rounded-full bg-gray-200" />
          <label
            htmlFor="avatar"
            className="cursor-pointer px-3 py-2 border border-gray-200 rounded-md hover:bg-orange-400 hover:text-white t-300"
          >
            Change Avatar
            <input id="avatar" className="hidden" type="file" {...register("avatar")} />
          </label>
        </div>
        <div className="space-y-1 mt-2">
          <label htmlFor="name" className="text-sm">
            Name
          </label>
          <input
            id="name"
            className="input"
            type="name"
            onFocus={() => clearErrors()}
            placeholder={user.name || ""}
            {...register("name")}
          />
        </div>
        <div className="space-y-1 mt-2">
          <label htmlFor="email" className="text-sm">
            Email Address
          </label>
          <input
            id="email"
            className="input"
            type="email"
            onFocus={() => clearErrors()}
            placeholder={user.email || ""}
            {...register("email")}
          />
        </div>
        <div className="space-y-1 mt-2">
          <label className="text-sm">Phone number</label>
          <div className="flex w-full">
            <span className="text-sm text-gray-400 border rounded-l-md py-2 px-3 select-none bg-gray-100">
              +82
            </span>
            <input
              className="input rounded-l-none border-l-0 hover:border-l focus:border-l"
              type="number"
              onFocus={() => clearErrors()}
              {...register("phone")}
            />
          </div>
        </div>
        {errors.error ? (
          <p className="text-center text-red-400 font-bold mt-4">{errors.error.message}</p>
        ) : null}
        <button className="button mt-4">{loading ? "Loading" : "Update Profile"}</button>
      </form>
    </Layout>
  ) : null;
};

export default EditProfile;
