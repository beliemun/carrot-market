import { withApiSession, withHandler } from "@libs/server";
import { IResponseProps } from "@shared/types";
import { NextApiHandler } from "next";

const handler: NextApiHandler<IResponseProps> = async (req, res) => {
  req.session.destroy();
  return res.status(200).json({ ok: true });
};

export default withApiSession(withHandler({ method: "POST", handler }));
