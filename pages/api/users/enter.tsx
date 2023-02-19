import { prisma, withApiSession, withHandler } from "@libs/server";
import { IResponseProps } from "@shared/types";
import { NextApiHandler } from "next";
import mail from "@sendgrid/mail";

mail.setApiKey(process.env.SENDGRID_API!);

const handler: NextApiHandler<IResponseProps> = async (req, res) => {
  const { email, phone } = req.body;
  if (!email && !phone) {
    return res.status(400).json({ ok: false });
  }
  const user = email ? { email } : { phone };
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await prisma.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });
  // if (phone) {
  //   const message = await twilio.messages.create({
  //     messagingServiceSid: process.env.TWILIO_MSID,
  //     to: process.env.MY_NUMBER!,
  //     body: `Your login token is ${payload}`,
  //   });
  //   console.log(message);
  // } else if (email) {
  //   const email = await mail.send({
  //     from: "contact@kimxy.net",
  //     to: "burngrit@icloud.com",
  //     subject: "Your Carrot Market Verification Email",
  //     text: `Your token is ${payload}`,
  //     html: `<strong>Your token is ${payload}</strong>`,
  //   });
  //   console.log(email);
  // }
  res.status(200).json({ ok: true, email, phone });
};

export default withApiSession(
  withHandler({ method: "POST", handler, isPrivate: false })
);
