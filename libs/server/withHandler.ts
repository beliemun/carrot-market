import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

interface IWithHandlerConfigProps {
  method: "GET" | "POST" | "DELETE";
  handler: NextApiHandler;
  isPrivate?: boolean;
}

const withHandler = ({
  method,
  handler,
  isPrivate = true,
}: IWithHandlerConfigProps) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== method) {
      return res.status(405).end();
    }
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false, error: "Please login." });
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
