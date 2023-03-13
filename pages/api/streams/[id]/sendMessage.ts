import { prisma, withApiSession, withHandler } from "@libs/server";
import { ResponseType } from "@shared/types";
import { NextApiHandler } from "next";
import streams from "..";

const handler: NextApiHandler<ResponseType> = async (req, res) => {
  const {
    query: { id },
    body: { message },
    session: { user },
  } = req;
  if (!id) {
    return res.json({ ok: false, error: "ID not found." });
  }
  const newMessage = await prisma.message.create({
    data: {
      message,
      user: { connect: { id: user?.id } },
      stream: { connect: { id: +id.toString() } },
    },
  });
  return res.json({ ok: true, newMessage });
};

export default withApiSession(withHandler({ methods: ["POST"], handler }));
