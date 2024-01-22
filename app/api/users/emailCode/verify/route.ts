import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const json = await request.json();
  const userCode = Number(json.code);
  const userId = json.userId.split("@")[0];
  const verifyCode = await kv.get(userId);
  if (userCode !== verifyCode) {
    return NextResponse.json({ isOk: false });
  } else {
    await kv.set(userId, verifyCode, { ex: 600 });
    return NextResponse.json({ isOk: true });
  }
}
