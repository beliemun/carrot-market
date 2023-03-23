import { getIronSession } from "iron-session/edge";
import { NextFetchEvent, NextRequest, NextResponse, userAgent } from "next/server";

export const middleware = async (req: NextRequest, ev: NextFetchEvent) => {
  const res = NextResponse.next();
  const session = await getIronSession(req, res, {
    cookieName: "carrot-session",
    password: process.env.IRON_SESSION!,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production", // if you are using https
    },
  });

  if (!req.nextUrl.pathname.startsWith("/_next")) {
    if (req.nextUrl.pathname.startsWith("/")) {
      if (userAgent(req).isBot) {
        return new Response("A bot can not access!", { status: 403 });
      }
    }

    if (!req.nextUrl.pathname.startsWith("/api")) {
      if (!req.nextUrl.pathname.startsWith("/enter") && !session.user) {
        const url = req.nextUrl.clone();
        url.pathname = "/enter";
        return NextResponse.redirect(url);
      }
    }

    if (req.nextUrl.pathname.startsWith("/products")) {
      console.log("Products Middleware");
    }
  }
};
