import { prisma, withApiSession, withHandler } from "@libs/server";
import { ResponseType } from "@shared/types";
import { NextApiHandler } from "next";

const handler: NextApiHandler<ResponseType> = async (req, res) => {
  if (req.method === "GET") {
    const {
      query: { latitude, longitude },
    } = req;
    if (!latitude || !longitude) {
      return res.json({ ok: false, error: "Coords not found." });
    }
    const parsedLatitude = parseFloat(latitude.toString());
    const parsedLongitude = parseFloat(longitude.toString());
    const posts = await prisma.post.findMany({
      where: {
        latitude: {
          gte: parsedLatitude - 0.01,
          lte: parsedLatitude + 0.01,
        },
        longitude: {
          gte: parsedLongitude - 0.01,
          lte: parsedLongitude + 0.01,
        },
      },
      include: {
        user: { select: { id: true, name: true, avatar: true } },
        _count: { select: { answers: true, interests: true } },
      },
    });
    return res.json({
      ok: true,
      posts,
    });
  }
  if (req.method === "POST") {
    const {
      body: { question, latitude, longitude },
      session: { user },
    } = req;
    const post = await prisma.post.create({
      data: {
        question,
        latitude,
        longitude,
        user: { connect: { id: user?.id } },
      },
    });
    return res.json({ ok: true, post });
  }
};

export default withApiSession(withHandler({ methods: ["GET", "POST"], handler }));
