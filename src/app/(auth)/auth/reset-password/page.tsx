
import UpdatePassword from "@/components/UpdatePassword";
import { connectDB } from "@/libs/db";
import PasswordResetTokenModel from "@/models/passwordResetTokenModel";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  searchParams: {
    token: string;
    userId: string;
  };
}

const fetchTokenValidation = async (token: string, userId: string) => {
  await connectDB();
  const resetToken = await PasswordResetTokenModel.findOne({ user: userId });
  if (!resetToken) return null;

  const matched = await resetToken.compareToken(token);
  if (!matched) return null;

  return true;
};

export default async function ResetPassword({ searchParams }: Props) {
  const { token, userId } = searchParams;

  if (!token || !userId) return redirect("/404");

  const isValid = await fetchTokenValidation(token, userId);
  if (!isValid) return redirect("/404");

  return <UpdatePassword token={token} userId={userId} />;
}
