import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const values = await req.json();
  console.log(values);
  return NextResponse.json("Hello world");
}
