import { prisma, withApiSession, withHandler } from "@libs/server";
import { ResponseType } from "@shared/types";
import { NextApiHandler } from "next";

const handler: NextApiHandler<ResponseType> = async (req, res) => {
  const {
    method,
    body: { name, price, description, image },
    session: { user },
  } = req;
  if (method === "GET") {
    const products = await prisma.product.findMany({
      where: {
        records: {
          some: { type: "Sale" },
        },
      },
      orderBy: { updatedAt: "desc" },
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
    });
    return res.status(200).json({ ok: true, products });
  }

  if (method === "POST") {
    console.log("post:", name, price, description, image);
    const product = await prisma.product.create({
      data: {
        name,
        price: +price,
        description,
        image,
        user: { connect: { id: user?.id } },
        records: { create: { type: "Sale", user: { connect: { id: user?.id } } } },
      },
    });
    return res.status(200).json({ ok: true, product });
  }
};

export default withApiSession(withHandler({ methods: ["GET", "POST"], handler }));
