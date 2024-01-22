import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(request: NextRequest) {
  try {
    const req = await request.json();
    const userId = req.email.split("@")[0];
    const clientCode = Number(req.code);
    const serverVerifyCode = await kv.get(userId);
    if (serverVerifyCode !== clientCode)
      return NextResponse.json({ isOk: false, msg: "needCode" });
    const hasedPw = bcrypt.hashSync(req.pw, 10);

    await prisma.user.update({
      where: {
        email: userId,
      },
      data: {
        password: hasedPw,
      },
    });
    await kv.del(userId);
    return NextResponse.json({ isOk: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ isOk: false });
  }
}
