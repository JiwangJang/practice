import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    await prisma.user.create({
      data: req,
    });
    return Response.json({ isOk: true });
  } catch (error) {
    console.log(error);
    return Response.json({ isOk: false });
  }
}
