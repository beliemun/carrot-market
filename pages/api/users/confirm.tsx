import { prisma, withApiSession, withHandler } from "@libs/server";
import { IResponse } from "@shared/types";
import { NextApiHandler } from "next";

const handler: NextApiHandler<IResponse> = async (req, res) => {
  const { token } = req.body;
  const existedToken = await prisma.token.findUnique({
    where: { payload: token },
    include: { user: true },
  });
  if (!existedToken) {
    return res.status(404).json({ ok: false, error: "Invailed Token." });
  } else {
    req.session.user = {
      id: existedToken.userId,
    };
    await req.session.save();
    await prisma.token.deleteMany({
      where: { userId: existedToken.userId },
    });
    return res.status(200).json({ ok: true });
  }
};

export default withApiSession(
  withHandler({ method: "POST", handler, isPrivate: false })
);
