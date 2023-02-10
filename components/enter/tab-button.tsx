import React, { useEffect } from "react";
import { c } from "@libs/client/utils";

interface ITabButtonProps {
  method: "email" | "phone";
  onClick?: () => void;
  lable: string;
  [key: string]: any;
}

const TabButton = ({ method, onClick, lable, ...rest }: ITabButtonProps) => {
  useEffect(() => {
    console.log(method, method === "email");
  }, [method]);
  return (
    <button
      className={c(
        "pb-4 border-b-2",
        method === lable.toLowerCase()
          ? "text-orange-400 border-b-orange-400"
          : "text-gray-200 border-transparent"
      )}
      onClick={onClick}
      {...rest}
    >
      {lable}
    </button>
  );
};

export default TabButton;
