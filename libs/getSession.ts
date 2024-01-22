import { cookies } from "next/headers";

export interface Session {
  userId: string;
}

const getSession = async (): Promise<Session | boolean> => {
  const cookie = cookies().get("yeosu-token")?.value;
  if (!cookie) return false;

  const result = await fetch(`${process.env.BASE_URL}/api/users/session`, {
    method: "GET",
    headers: { Cookie: `yeosu-token=${cookie}` },
  });
  const json = await result.json();

  if (json.isOk) {
    return json.session;
  } else {
    return false;
  }
};

export default getSession;
