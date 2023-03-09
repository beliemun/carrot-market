import { prisma, withApiSession, withHandler } from "@libs/server";
import { ResponseType } from "@shared/types";
import { NextApiHandler } from "next";

const handler: NextApiHandler<ResponseType> = async (req, res) => {
  const {
    session: { user },
  } = req;
  const records = await prisma.record.findMany({
    where: {
      userId: user?.id,
      type: "Sale",
    },
    include: {
      product: {
        include: {
          _count: {
            select: {
              records: {
                where: {
                  type: "Favorite",
                },
              },
            },
          },
        },
      },
    },
  });
  return res.json({ ok: true, records });
};

export default withApiSession(withHandler({ methods: ["GET"], handler }));
