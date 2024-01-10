import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const req = await request.json();
  await prisma.user.createMany({
    data: req,
  });

  return Response.json({ sucess: true });
}
