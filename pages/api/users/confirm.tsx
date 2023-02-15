import { prisma, withApiSession, withHandler } from "@libs/server";
import { IResponseProps } from "@shared/types";
import { NextApiHandler } from "next";

const handler: NextApiHandler<IResponseProps> = async (req, res) => {
  const { token } = req.body;
  console.log("#1", token, typeof token);
  const exists = await prisma.token.findUnique({
    where: { payload: token },
    include: { user: true },
  });

  if (!exists) {
    return res.status(404).json({ ok: false });
  } else {
    req.session.user = {
      id: exists.userId,
    };
    await req.session.save();
    return res.status(200).json({ ok: true });
  }
};

export default withApiSession(withHandler("POST", handler));
