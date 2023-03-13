import { prisma, withApiSession, withHandler } from "@libs/server";
import { ResponseType } from "@shared/types";
import { NextApiHandler } from "next";

const handler: NextApiHandler<ResponseType> = async (req, res) => {
  if (req.method === "GET") {
    // const { query:{ }, } = req;
    const streams = await prisma.stream.findMany({
      take: 0,
    });
    return res.json({ ok: true, streams });
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
