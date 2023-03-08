import { prisma, withApiSession, withHandler } from "@libs/server";
import { ResponseType } from "@shared/types";
import { NextApiHandler } from "next";

const handler: NextApiHandler<ResponseType> = async (req, res) => {
  const {
    session: { user },
  } = req;
  const reviews = await prisma.review.findMany({
    where: { createdForId: user?.id },
    include: {
      createdFor: true,
      createdBy: true,
    },
  });
  return res.json({ ok: true, reviews });
};

export default withApiSession(withHandler({ methods: ["GET"], handler }));
