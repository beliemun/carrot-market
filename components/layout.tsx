import { c } from "@/pages/libs/utils";
import Link from "next/link";
import React from "react";

interface ILayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
}

const Layout = ({ title, canGoBack, hasTabBar, children }: ILayoutProps) => {
  return (
    <div>
      <div className="fixed w-full bg-white row-center border-b border-gray-200 h-12">
        <span className="font-medium text-orange-400">{title}</span>
      </div>
      <div className={c("pt-12 ", hasTabBar ? "pb-16" : "")}>{children}</div>
      {hasTabBar ? (
        <nav className="fixed w-full bg-white row-center border-b border-gray-200 h-12">
          {/* <Link ></Link> */}
        </nav>
      ) : null}
    </div>
  );
};
export default Layout;
