import { NextRequest, NextResponse } from "next/server";
import getUuid from "@/libs/uuid";
import transporter from "@/libs/mailConfig";
import { PrismaClient } from "@prisma/client";

interface CustomError extends Error {
  code?: string;
}

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userEmail = searchParams.get("userEmail");
  if (!userEmail) {
    throw Error("EmailError");
  }
  try {
    const userEmailList = await prisma.user.findMany({
      select: {
        email: true,
      },
    });

    if (userEmailList.find(({ email }) => email === userEmail.split("@")[0])) {
      return NextResponse.json({ isOk: false, msg: "redundant" });
    }

    const uuid = getUuid();
    await transporter.sendMail({
      from: "jiwang917@naver.com",
      to: userEmail,
      subject: "여수속마음서비스 인증번호입니다",
      html: `
        <h1 style="font-size: 30px; margin-bottom:20px;">인증번호안내</h1>
        <p style="font-size: 20px;">귀하의 인증번호는 <b style="font-size: 22px;">${uuid}</b>입니다</p>
      `,
    });

    return NextResponse.json({ isOk: true, verifyCode: uuid });
  } catch (error: any) {
    console.log("에러객체", error);
    if (error) {
      if (error.code === "EDNS") {
        return NextResponse.json({ isOk: false, msg: "Internet" });
      }
      if (error.code === "EENVELOPE") {
        return NextResponse.json({ isOk: false, msg: "Not Sended" });
      }
    }
    return NextResponse.json({ isOk: false, msg: "Server Error" });
  }
}
