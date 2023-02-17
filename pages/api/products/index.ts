import { prisma, withApiSession, withHandler } from "@libs/server";
import { IResponse } from "@shared/types";
import { NextApiHandler } from "next";

const handler: NextApiHandler<IResponse> = async (req, res) => {
  const {
    body: { name, price, description },
    session: { user },
  } = req;
  const product = await prisma.products.create({
    data: {
      name,
      price: +price,
      description,
      image: "",
      user: { connect: { id: user?.id } },
    },
  });
  return res.status(200).json({ ok: true, product });
};

export default withApiSession(withHandler({ method: "POST", handler }));
