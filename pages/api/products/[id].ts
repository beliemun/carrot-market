import { prisma } from "@libs/server";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const { id } = req.query;
  if (id === undefined) return res.json({ ok: false, error: "Id not found." });

  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
    include: { user: true },
  });
  const terms = product?.name
    .split(" ")
    .map((word) => ({ name: { contains: word } }));
  console.log(terms);
  const relatedProducts = await prisma.product.findMany({
    where: {
      OR: terms,
      AND: [{ id: { not: product?.id } }],
    },
  });
  console.log(relatedProducts);
  return res.json({ ok: true, product, relatedProducts });
};

export default handler;
