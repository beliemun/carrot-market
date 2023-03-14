import { Layout, UploadButton } from "@components/shared";
import ArrowButton from "@components/shared/ArrowButton";
import { StreamItem } from "@components/streams";
import { useUser } from "@libs/client";
import { c } from "@libs/client/utils";
import { Stream } from "@prisma/client";
import { ResponseType } from "@shared/types";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";

interface StreamResult extends ResponseType {
  streams: Stream[];
  totalPage: number;
}

const PAGE_COUNT = 5; // 한화면에 보여줄 페이지 수
const TAKE = 10;

const Stream: NextPage = () => {
  const { user } = useUser();
  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalCount] = useState(63); // 총 아이템 수
  const [totalPage] = useState(Math.ceil(totalCount / TAKE)); // 총 페이지
  const [pageGroup, setPageGroup] = useState(1);
  const [lastNumber, setLastNumber] = useState(1);
  const [firstNumber, setFirstNumber] = useState(1);
  const { data } = useSWR<StreamResult>(`/api/streams?skip=${skip}&take=${TAKE}`);
  const { mutate } = useSWRConfig();
  // const handleClick = (direction: "PREV" | "NEXT") => {
  //   if (direction === "NEXT") {
  //     setSkip((prev) => prev + TAKE);
  //     setCurrentPage((prev) => prev + 1);
  //     mutate(`/api/streams?skip=${skip}&take=${TAKE}`);
  //   }
  //   if (direction === "PREV" && skip > 0) {
  //     setSkip((prev) => prev - TAKE);
  //     setCurrentPage((prev) => prev - 1);
  //     mutate(`/api/streams?skip=${skip}&take=${TAKE}`);
  //   }
  // };

  useEffect(() => {
    if (data && data.ok) {
      const lastNumber = pageGroup * PAGE_COUNT;
      if (lastNumber > totalCount) {
        setLastNumber(totalCount);
      } else {
        setLastNumber(lastNumber);
      }
      setFirstNumber(lastNumber - (PAGE_COUNT - 1));
    }
  }, [data, currentPage]);

  useEffect(() => {
    console.log(TAKE * currentPage);
    mutate(`/api/streams?skip=${TAKE * (currentPage - 1)}&take=${TAKE}`);
  }, [currentPage]);

  const handleChangePage = (amount: number) => {
    if (currentPage + amount > totalPage || currentPage + amount <= 0) {
      return;
    }
    setCurrentPage(currentPage + amount);
    setPageGroup(Math.ceil((currentPage + amount) / PAGE_COUNT));
  };
  return (
    <Layout title="Streams" hasTabBar={true}>
      <div className={`flex justify-between items-center px-4`}>
        <ArrowButton type="PREV" onClick={() => handleChangePage(-1)} />
        {[...Array(lastNumber - firstNumber + 1)].map((_, index) => {
          const currentNumber = index + 1 + (pageGroup - 1) * PAGE_COUNT;
          return (
            <span
              onClick={() => {
                const isCurrentPage = Boolean(currentNumber === currentPage);
                if (!isCurrentPage) {
                  handleChangePage(firstNumber + index - currentPage);
                }
              }}
              key={index}
              className={c(
                "cursor-pointer text-sm",
                `${currentNumber === currentPage && "font-bold text-orange-400"}`,
                `${currentNumber > totalPage && "pointer-events-none opacity-0"}`
              )}
            >{`[${currentNumber}]`}</span>
          );
        })}
        <ArrowButton type="NEXT" onClick={() => handleChangePage(1)} />
      </div>
      <div>
        <div className="divide-y">
          {data?.streams.map((stream, index) => (
            <Link href={`/streams/${stream.id}`} key={index}>
              <StreamItem className={`p-4`} stream={stream} untouchable />
            </Link>
          ))}
        </div>
        <UploadButton type="Stream" url="streams/create" />
      </div>
    </Layout>
  );
};

export default Stream;
