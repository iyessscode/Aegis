import { auth } from "@/config/auth/server";
import { headers as getHeaders } from "next/headers";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default async function ProtectedLayout({ children }: Props) {
  const session = await auth.api.getSession({
    headers: await getHeaders(),
  });

  if (session == null) return redirect("/sign-in");

  return children;
}
