import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

export interface IResponseProps {
  ok: boolean;
  [key: string]: any;
}

const withHandler = (
  method: "GET" | "POST" | "DELETE",
  handler: NextApiHandler
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== method) {
      return res.status(405).end();
    }
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
};

export default withHandler;
