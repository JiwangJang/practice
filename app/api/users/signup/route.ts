import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { kv } from "@vercel/kv";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const userEmail = req.email.split("@")[0];
    const serverVerifyCode = await kv.get(userEmail);

    if (serverVerifyCode !== req.verifyCode)
      return NextResponse.json({ isOk: false, msg: "needCode" });
    const hasedPw = bcrypt.hashSync(req.password, 10);

    await prisma.user.create({
      data: {
        nickname: req.nickname,
        email: userEmail,
        password: hasedPw,
      },
    });
    return NextResponse.json({ isOk: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ isOk: false });
  }
}
