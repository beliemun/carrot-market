import { withApiSession, withHandler } from "@libs/server";
import { ResponseType } from "@shared/types";
import { NextApiHandler } from "next";

const handler: NextApiHandler<ResponseType> = async (req, res) => {
  return res.json({ ok: true, url: "" });
};

export default withApiSession(withHandler({ methods: ["POST"], handler }));
