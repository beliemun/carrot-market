import { NextPage } from "next";

const Write: NextPage = () => {
  return (
    <div className="p-4">
      <textarea className="input" />
      <button className="button mt-2">Submit</button>
    </div>
  );
};

export default Write;
