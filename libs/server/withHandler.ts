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
      console.log("Status: 405");
      return res.status(405).end();
    }
    if (isPrivate && !req.session.user) {
      console.log("Status: 401");
      return res.status(401).json({ ok: false, error: "You need to login." });
    }
    try {
      console.log("Status: 200", req.body);
      return handler(req, res);
    } catch (error) {
      console.log("Status: 500");
      return res.status(500).json({ error });
    }
  };
};

export default withHandler;
