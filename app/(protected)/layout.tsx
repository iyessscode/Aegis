import { headers as getHeaders } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/config/auth/server";

type Props = {
  children: React.ReactNode;
};

export default async function ProtectedLayout({ children }: Props) {
  await auth.api
    .getSession({
      headers: await getHeaders(),
    })
    .then((res) => {
      if (!res?.session.token || !res?.user.emailVerified)
        return redirect("/sign-in");
    });

  return children;
}
