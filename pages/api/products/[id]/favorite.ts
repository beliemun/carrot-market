import { prisma, withApiSession, withHandler } from "@libs/server";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const {
    query: { id },
    session: { user },
  } = req;
  const records = await prisma.record.findFirst({
    where: {
      userId: user?.id,
      productId: Number(id),
      type: "Favorite",
    },
  });
  if (records) {
    await prisma.record.delete({
      where: { id: records.id },
    });
  } else {
    await prisma.record.create({
      data: {
        user: { connect: { id: user?.id } },
        product: { connect: { id: Number(id) } },
        type: "Favorite",
      },
    });
  }
  return res.json({ ok: true });
};

export default withApiSession(withHandler({ methods: ["POST"], handler }));
