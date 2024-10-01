import { connectDB } from "@/libs/db";
import UserModel from "@/models/userModel";
import { NextResponse } from "next/server";
import crypto from "crypto";
import EmailVerificationToken from "@/models/emailVerificationToken";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const body = await request.json();
  await connectDB();

  const newUser = await UserModel.create({ ...body });

  const token = crypto.randomBytes(36).toString("hex");
  await EmailVerificationToken.create({
    user: newUser._id,
    token,
  });

  // Looking to send emails in production? Check out our Email API/SMTP product!
  // @ts-ignore
  var transport = nodemailer.createTransport({
    host: "sandbox.api.mailtrap.io",
    port: 2525,
    auth: {
      user: "a9bc224244d055",
      pass: "07cc76d5107a60",
    },
  });

  transport.sendMail({
    from: "verification@nextecom.com",
    to: newUser.email,
    html: `<h1>please verify your email. by clickng <a href="http://localhost:3000/auth/verify?token=${token}&userId=${newUser._id}">This link...</a></h1>`,
  });

  return NextResponse.json(newUser);
}
