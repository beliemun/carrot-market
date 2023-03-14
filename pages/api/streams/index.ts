import { prisma, withApiSession, withHandler } from "@libs/server";
import { ResponseType } from "@shared/types";
import { NextApiHandler } from "next";

const handler: NextApiHandler<ResponseType> = async (req, res) => {
  if (req.method === "GET") {
    const {
      query: { skip, take },
    } = req;
    const totalCount = await prisma.stream.count();
    console.log("B totalCount:", totalCount);
    const streams = await prisma.stream.findMany({
      skip: Number(skip),
      take: Number(take),
    });
    return res.json({ ok: true, streams, totalCount });
  }
  if (req.method === "POST") {
    const {
      session: { user },
      body: { name, price, description },
    } = req;
    const stream = await prisma.stream.create({
      data: {
        name,
        price,
        description,
        user: {
          connect: { id: user?.id },
        },
      },
    });
    return res.json({ ok: true, stream });
  }

  return res.json({ ok: true });
};

export default withApiSession(withHandler({ methods: ["GET", "POST"], handler }));
