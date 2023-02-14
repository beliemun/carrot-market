import { IResponseProps, withHandler } from "@libs/server";
import { NextApiHandler } from "next";

const handler: NextApiHandler<IResponseProps> = async (req, res) => {
  const { token } = req.body;
  return res.status(200).json({ ok: true, token });
};

export default withHandler("POST", handler);
