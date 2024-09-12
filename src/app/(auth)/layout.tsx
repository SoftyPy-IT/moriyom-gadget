import React, { PropsWithChildren } from "react";
import { getServerSession } from "next-auth/next";
import {
  authOptions,
  CustomeSession,
} from "@/app/api/auth/[...nextauth]/options";
import AuthProvider from "@/providers/AuthProvider";

export default async function layout({ children }: PropsWithChildren) {
  const session: CustomeSession | null = await getServerSession(authOptions);
  return (
    <AuthProvider session={session}>
      <div className="bg-[#f9fafb]">{children}</div>
    </AuthProvider>
  );
}
