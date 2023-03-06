import { prisma, withApiSession, withHandler } from "@libs/server";
import { ResponseType } from "@shared/types";
import { NextApiHandler } from "next";
import answer from "./[id]/answer";

const handler: NextApiHandler<ResponseType> = async (req, res) => {
  const {
    body: { question },
    session: { user },
    method,
  } = req;
  if (method === "GET") {
    const posts = await prisma.post.findMany({
      include: {
        user: { select: { id: true, name: true, avatar: true } },
        _count: { select: { answers: true, interests: true } },
      },
    });
    res.json({
      ok: true,
      posts,
    });
  }
  if (method === "POST") {
    console.log("question:", question);
    const post = await prisma.post.create({
      data: {
        question,
        user: { connect: { id: user?.id } },
      },
    });
    return res.json({ ok: true, post });
  }
};

export default withApiSession(withHandler({ methods: ["GET", "POST"], handler }));
