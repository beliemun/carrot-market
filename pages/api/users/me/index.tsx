import { prisma, withApiSession, withHandler } from "@libs/server";
import { ResponseType } from "@shared/types";
import { NextApiHandler } from "next";

const handler: NextApiHandler<ResponseType> = async (req, res) => {
  if (req.method === "GET") {
    const user = await prisma.user.findUnique({
      where: { id: req.session.user?.id },
    });
    return res.json({ ok: true, user });
  }
  if (req.method === "POST") {
    const {
      body: { name, email, phone, avatarId },
      session: { user },
    } = req;
    if (name) {
      await prisma.user.update({
        where: { id: user?.id },
        data: { name },
      });
    }
    if (email) {
      const exists = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
        },
      });
      if (exists) {
        return res.json({
          ok: false,
          error: "Email already taken.",
        });
      } else {
        await prisma.user.update({
          where: { id: user?.id },
          data: { email },
        });
      }
    }
    if (phone) {
      const exists = await prisma.user.findUnique({
        where: { phone },
        select: {
          id: true,
        },
      });
      if (exists) {
        return res.json({
          ok: false,
          error: "Phone number already taken.",
        });
      } else {
        await prisma.user.update({
          where: { id: user?.id },
          data: { phone },
        });
      }
    }
    if (avatarId) {
      await prisma.user.update({
        where: { id: user?.id },
        data: { avatar: avatarId },
      });
    }
    return res.json({ ok: true });
  }
};

export default withApiSession(withHandler({ methods: ["GET", "POST"], handler }));
