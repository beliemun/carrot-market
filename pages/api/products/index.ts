import { prisma } from "@libs/server";
import { IResponseProps } from "@shared/types";
import { NextApiHandler } from "next";

const handler: NextApiHandler<IResponseProps> = async (req, res) => {
  const { name } = req.body;
  const user = await prisma.user.findUnique({
    where: {},
  });
};

export default handler;
