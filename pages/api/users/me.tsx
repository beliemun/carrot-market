import { prisma, withApiSession, withHandler } from "@libs/server";
import { IResponseProps } from "@shared/types";
import { NextApiHandler } from "next";

const handler: NextApiHandler<IResponseProps> = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.session.user?.id },
  });
  return res.json({
    ok: true,
    user,
  });
};

export default withApiSession(
  withHandler({
    method: "GET",
    handler,
  })
);
