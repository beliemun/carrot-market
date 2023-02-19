import { useRouter } from "next/router";
import useSWR from "swr";

const useUser = () => {
  const { data, error, isLoading } = useSWR("api/users/me");
  const router = useRouter();
  if (data && !data.ok) {
    console.log("Redireted", data, data.ok);
    router.replace("/enter");
  }
  return { user: data?.user, error, isLoading };
};

export default useUser;
