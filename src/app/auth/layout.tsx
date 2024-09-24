import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "User Register",
  description: "This page is for user registration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className='flex justify-center items-center h-[100vh]'>{children}</div>;
}
