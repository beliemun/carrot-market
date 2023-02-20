import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

const useUser = () => {
  const { data, error, isLoading } = useSWR("/api/users/me");
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok) {
      router.replace("/enter");
    }
  }, [data, router, isLoading]);
  return { user: data?.user, error, isLoading };
};

export default useUser;
