import Layout from "@/components/layout";
import { NextPage } from "next";

const Write: NextPage = () => {
  return (
    <Layout title="Write" canGoBack={true}>
      <div className="p-4">
        <textarea className="input" />
        <button className="button mt-2">Submit</button>
      </div>
    </Layout>
  );
};

export default Write;
