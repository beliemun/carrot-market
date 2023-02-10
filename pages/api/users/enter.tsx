import withHandler from "@libs/server/withHandler";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  console.log(req.body);
  return res.status(200).end();
};

export default withHandler("POST", handler);
