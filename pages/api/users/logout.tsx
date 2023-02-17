import { withApiSession, withHandler } from "@libs/server";
import { ResponseType } from "@shared/types";
import { NextApiHandler } from "next";

const handler: NextApiHandler<ResponseType> = async (req, res) => {
  req.session.destroy();
  return res.status(200).json({ ok: true });
};

export default withApiSession(withHandler({ methods: ["POST"], handler }));
