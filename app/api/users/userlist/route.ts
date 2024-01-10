import { PrismaClient } from "@prisma/client";

interface UserInfo {
  userid: number;
  email: string;
  password: string;
  image: string;
  isblocked: boolean;
  blockreason: string;
  nickname: string;
}

const prisma = new PrismaClient();

export async function GET() {
  try {
    const userList: UserInfo[] = await prisma.user.findMany();
    const nicknameList = userList.map(
      ({ nickname }: { nickname: string }) => nickname
    );
    return Response.json({ nicknameList, isOk: true });
  } catch (error) {
    return Response.json({ isOk: false });
  }
}
