import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import { kv } from "@vercel/kv";

interface userInfo {
  userid: number;
  email: string;
  password: string;
  nickname: string;
  image: string;
  isblocked: Boolean;
  blockreason: string;
}

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const { userId, userPw } = req;
    const userInfo: userInfo | null = await prisma.user.findUnique({
      where: {
        email: userId,
      },
    });

    if (!userInfo) return NextResponse.json({ isOk: false, msg: "notFound" });

    if (bcrypt.compareSync(userPw, userInfo.password)) {
      const uuid = crypto.randomUUID();
      // 배포시 1시간(3600초)으로 늘리기
      await kv.set(uuid, { userId }, { ex: Number(process.env.COOKIE_TTL) });
      cookies().set("yeosu-token", uuid, {
        httpOnly: true,
        // secure: true,
        maxAge: Number(process.env.COOKIE_TTL),
      });
      return NextResponse.json({ isOk: true });
    } else {
      return NextResponse.json({ isOk: false, msg: "pwError" });
    }
  } catch (error) {
    return NextResponse.json({ isOk: false, msg: "serverError" });
  }
}
