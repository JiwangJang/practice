import { Session } from "@/libs/getSession";
import { kv } from "@vercel/kv";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const token = cookies().get("yeosu-token")?.value;
  if (!token) return NextResponse.json({ isOk: false, msg: "notLogined" });
  const session: Session | null = await kv.get(token);
  if (!session)
    return NextResponse.json({ isOk: false, msg: "sessionExpired" });
  await kv.set(
    token,
    { userId: session.userId },
    { ex: Number(process.env.COOKIE_TTL) }
  );
  cookies().set("yeosu-token", token, {
    httpOnly: true,
    // secure: true,
    maxAge: Number(process.env.COOKIE_TTL),
  });
  return NextResponse.json({ isOk: true, session });
}

// 클라에서 쿠키가 오지 않음.. 구글링 필요함
