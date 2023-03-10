import { prisma, withApiSession, withHandler } from "@libs/server";
import { ResponseType } from "@shared/types";
import { NextApiHandler } from "next";

const handler: NextApiHandler<ResponseType> = async (req, res) => {
  const {
    query: { id },
  } = req;
  if (!id) {
    return res.json({ ok: false, error: "Stream ID is required." });
  }
  const stream = await prisma.stream.findUnique({
    where: { id: Number(id) },
  });
  if (!stream) {
    return res.json({ ok: false, error: "Stream not found." });
  }
  return res.json({ ok: true, stream });
};

export default withApiSession(withHandler({ methods: ["GET"], handler }));
