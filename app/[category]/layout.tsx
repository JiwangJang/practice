import Main from "@/components/layoutComp/Main";
import getSession, { Session } from "@/libs/getSession";
import { cookies } from "next/headers";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session: Session | boolean = await getSession();
  return <Main isAuth={session ? true : false}>{children}</Main>;
};

export default layout;
