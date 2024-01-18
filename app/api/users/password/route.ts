import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(request: NextRequest) {
  try {
    const req = await request.json();
    const userEmail = req.email.split("@")[0];
    const serverVerifyCode = await kv.get(userEmail);

    if (serverVerifyCode !== req.verifyCode)
      return NextResponse.json({ isOk: false, msg: "needCode" });
    const hasedPw = bcrypt.hashSync(req.password, 10);

    await prisma.user.update({
      where: {
        email: userEmail,
      },
      data: {
        password: hasedPw,
      },
    });

    return NextResponse.json({ isOk: true });
  } catch (error) {
    return NextResponse.json({ isOk: false });
  }
}
