import { prisma, withApiSession, withHandler } from "@libs/server";
import { ResponseType } from "@shared/types";
import { NextApiHandler } from "next";

const handler: NextApiHandler<ResponseType> = async (req, res) => {
  const {
    query: { id },
    session: { user },
  } = req;
  if (!id) {
    return res.json({ ok: false });
  }
  const post = await prisma.post.findUnique({
    where: { id: +id.toString() },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      answers: {
        select: {
          id: true,
          answer: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      },
      _count: {
        select: {
          answers: true,
          interests: true,
        },
      },
    },
  });
  const isInterestedIn = await prisma.interest.findFirst({
    where: {
      postId: +id.toString(),
      userId: user?.id,
    },
    select: {
      id: true,
    },
  });
  if (!post) {
    return res.status(404).json({ ok: false, error: "Not found post." });
  }
  return res.json({ ok: true, post, isInterestedIn: Boolean(isInterestedIn) });
};

export default withApiSession(withHandler({ methods: ["GET"], handler }));
