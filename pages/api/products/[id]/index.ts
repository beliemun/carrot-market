import { prisma, withApiSession, withHandler } from "@libs/server";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const {
    query: { id },
    session: { user },
  } = req;
  if (id === undefined) return res.json({ ok: false, error: "Id not found." });

  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
    include: { user: true },
  });
  const terms = product?.name.split(" ").map((word) => ({ name: { contains: word } }));
  const relatedProducts = await prisma.product.findMany({
    where: {
      OR: terms,
      AND: [{ id: { not: product?.id } }],
    },
  });
  const favorite = await prisma.record.findFirst({
    where: {
      userId: user?.id,
      productId: product?.id,
      type: "Favorite",
    },
    select: { id: true },
  });
  return res.json({
    ok: true,
    product,
    isLiked: Boolean(favorite),
    relatedProducts,
  });
};

export default withApiSession(withHandler({ methods: ["GET"], handler }));
