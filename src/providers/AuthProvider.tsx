"use client";
import { CustomeSession } from "@/app/api/auth/[...nextauth]/options";
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { useRouter } from "next/navigation";
import React from "react";
import { signOut } from "next-auth/react";

interface AuthProviderProps {
  session: CustomeSession | null;
  children: React.ReactNode;
}

interface User {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

const AuthProvider = ({ session, children }: AuthProviderProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  if (session !== null) {
    router.replace("/");
    router.refresh();
  }

  if (session) {
    const user = verifyToken(session.user?.token as string) as User;
    // check if the token is expired
    if (user.exp * 1000 < Date.now()) {
      signOut({
        redirect: true,
        callbackUrl: "/login",
      });

      dispatch(logout());
    }
  }

  return <>{children}</>;
};

export default AuthProvider;
