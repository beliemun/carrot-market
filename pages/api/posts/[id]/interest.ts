import { prisma, withApiSession, withHandler } from "@libs/server";
import { ResponseType } from "@shared/types";
import { NextApiHandler } from "next";

const handler: NextApiHandler<ResponseType> = async (req, res) => {
  const {
    query: { id },
    session: { user },
  } = req;
  if (!id) {
    return res.json({ ok: false, error: "Post Id is undefined." });
  }
  const interest = await prisma.interest.findFirst({
    where: {
      userId: user?.id,
      postId: +id?.toString(),
    },
    select: {
      id: true,
    },
  });
  if (interest) {
    await prisma.interest.delete({
      where: { id: interest.id },
    });
  } else {
    await prisma.interest.create({
      data: {
        user: { connect: { id: user?.id } },
        post: { connect: { id: +id.toString() } },
      },
    });
  }
  return res.json({ ok: true });
};

export default withApiSession(withHandler({ methods: ["POST"], handler }));
