import { prisma, withApiSession, withHandler } from "@libs/server";
import { IResponseProps } from "@shared/types";
import { NextApiHandler } from "next";

const handler: NextApiHandler<IResponseProps> = async (req, res) => {
  console.log(req.session.user);
  const user = await prisma.user.findUnique({
    where: { id: req.session.user?.id },
  });
  return res.json({
    ok: true,
    user,
  });
};

export default withApiSession(withHandler("GET", handler));
