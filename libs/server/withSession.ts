import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: "carrotSession",
  password: process.env.IRON_SESSION!,
};

export const withApiSession = (fn: any) => {
  return withIronSessionApiRoute(fn, cookieOptions);
};
