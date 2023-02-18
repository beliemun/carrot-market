import { prisma, withApiSession, withHandler } from "@libs/server";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const {
    query: { id },
    session: { user },
  } = req;
  const favorite = await prisma.favorite.findFirst({
    where: {
      userId: user?.id,
      productId: Number(id),
    },
  });
  if (favorite) {
    await prisma.favorite.delete({
      where: { id: favorite.id },
    });
    console.log("Deleted");
  } else {
    await prisma.favorite.create({
      data: {
        user: { connect: { id: user?.id } },
        product: { connect: { id: Number(id) } },
      },
    });
    console.log("Created");
  }
  return res.json({ ok: true });
};

export default withApiSession(withHandler({ methods: ["POST"], handler }));
