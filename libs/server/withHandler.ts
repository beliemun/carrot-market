import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

type Method = "GET" | "POST" | "DELETE";

interface IWithHandlerConfig {
  methods: Method[];
  handler: NextApiHandler;
  isPrivate?: boolean;
}

const withHandler = ({
  methods,
  handler,
  isPrivate = true,
}: IWithHandlerConfig) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method && !methods.includes(req.method as any)) {
      console.log("Status: 405", !methods.includes(req.method as any));
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
