import { auth } from "@/authentication/auth";
import { Session } from "next-auth";

const currentRole = async () => {
  const session: Session | null = await auth();
  return session?.user?.role;
};

export default currentRole;
