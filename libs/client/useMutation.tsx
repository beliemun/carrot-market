import { useState } from "react";

interface IUseMutationProps<T> {
  loading: boolean;
  data?: T;
  error?: object;
}

type UseMutationType<T> = [(data: any) => void, IUseMutationProps<T>];

const useMutation = <T extends any>(url: string): UseMutationType<T> => {
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
