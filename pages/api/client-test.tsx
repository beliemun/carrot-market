import client from "@/libs/client";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await client.user.create({
    data: { name: "KIM", email: "burngrit@icloud.com" },
  });
  res.json({
    ok: true,
  });
};

export default handler;
