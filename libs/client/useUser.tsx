import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useUser = () => {
  const [user, setUser] = useState();
  const router = useRouter();
  useEffect(() => {
    fetch("api/users/me")
      .then((res) => res.json())
      .then((data) => {
        if (!data.ok) {
          return router.replace("/enter");
        }
        setUser(data.user);
      });
  }, [router]);
  return user;
};

export default useUser;
