import { prisma, withApiSession, withHandler } from "@libs/server";
import { ResponseType } from "@shared/types";
import { NextApiHandler } from "next";

const handler: NextApiHandler<ResponseType> = async (req, res) => {
  const {
    body: { question },
    session: { user },
  } = req;
  const post = await prisma.post.create({
    data: {
      question,
      user: { connect: { id: user?.id } },
    },
  });
  return res.json({ ok: true, post });
};

export default withApiSession(withHandler({ methods: ["POST"], handler }));
