import { useState } from "react";

interface IUseMutationProps {
  loading: boolean;
  data?: object;
  error?: object;
}

type UseMutationType = [(data: any) => void, IUseMutationProps];

const useMutation = (url: string): UseMutationType => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<undefined | any>(undefined);
  const [error, setError] = useState<undefined | any>(undefined);
  const mutation = (data: any): void => {
    setLoading(true);
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json().catch(() => {}))
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  };
  return [mutation, { loading, data, error }];
};

export default useMutation;
