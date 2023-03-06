import { prisma, withApiSession, withHandler } from "@libs/server";
import { ResponseType } from "@shared/types";
import { NextApiHandler } from "next";

const handler: NextApiHandler<ResponseType> = async (req, res) => {
  const {
    query: { id },
    session: { user },
    body: { answer },
  } = req;
  if (!id) {
    return res.json({ ok: false, error: "Post Id is undefined." });
  }
  const post = await prisma.post.findUnique({
    where: { id: +id.toString() },
    select: { id: true },
  });
  if (!post) {
    return res.json({ ok: false, error: "Post not found." });
  }
  const newAnswer = await prisma.answer.create({
    data: {
      answer,
      post: { connect: { id: post.id } },
      user: { connect: { id: user?.id } },
    },
  });
  return res.json({ ok: true, answer: newAnswer });
};

export default withApiSession(withHandler({ methods: ["POST"], handler }));
