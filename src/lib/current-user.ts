import { auth } from "@/authentication/auth";
import { Session } from "next-auth";

const currentUser = async () => {
  const session: Session | null = await auth();
  return session?.user;
};

export default currentUser;
