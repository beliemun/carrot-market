import { NextRequest, userAgent } from "next/server";

export const middleware = (req: NextRequest) => {
  if (req.nextUrl.pathname.startsWith("/")) {
    const ua = userAgent(req);
    if (ua.isBot) {
      return new Response("A bot can not access!", { status: 403 });
    }
    console.log(typeof req.cookies);
  }
  if (req.nextUrl.pathname.startsWith("/products")) {
    console.log("Products Middleware");
  }
};
