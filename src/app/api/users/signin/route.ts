import startDb from "@/lib/db";
import UserModel from "@/models/userModel";
import { SignInCredentials } from "@/types";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { email, password } = (await req.json()) as SignInCredentials;
  if (!email || !password)
    return NextResponse.json({
      error: "Invalid request, email password missing!",
    });

  await startDb();
  const user = await UserModel.findOne({ email });
  if (!user) return NextResponse.json({ error: "Email/Password mismatch!" });

  const passwordMatch = await user.comparePassword(password);
  if (!passwordMatch)
    return NextResponse.json({ error: "Email/Password mismatch!" });

  return NextResponse.json({
    user: {
      // @ts-ignore
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      avatar: user.avatar?.url,
      role: user.role,
      verified: user.verified,
    },
  });
};
