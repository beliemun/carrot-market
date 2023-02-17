import "@styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr/_internal";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher }}>
      <div className="">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}
