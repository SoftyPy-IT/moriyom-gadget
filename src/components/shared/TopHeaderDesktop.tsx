"use client";

import Link from "next/link";
import React from "react";
import Logo from "../common/Logo";
import HeaderSearchBar from "./HeaderSearchBar";

import UserAvatar from "./UserAvatar";
import UserIcon from "./UserIcon";
import { useAppSelector } from "@/redux/hooks";
import {
  selectProfile,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import Container from "../common/Container";

const TopHeaderDesktop = () => {
  const user = useAppSelector(selectProfile);
  const isAuthenticated = useAppSelector(useCurrentToken);
  return (
    <div className="bg-[#081621] text-white  z-50">
      <Container>
        <div className="relative flex h-16 justify-between ">
          <div className="relative z-10 flex ">
            <Link
              href="/"
              className=" hidden flex-shrink-0 items-center lg:flex"
            >
              <Logo />
            </Link>
          </div>
          <HeaderSearchBar />

          <div className="hidden space-x-3 lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
            {isAuthenticated ? (
              <>
                <UserIcon profile={isAuthenticated ? user : null} />
              </>
            ) : (
              <>
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-4">
                  <Link
                    href="/register"
                    className="text-sm font-medium text-gray-800 hover:text-gray-500"
                  >
                    Create an account
                  </Link>
                  <span className="h-6 w-px bg-gray400" aria-hidden="true" />
                  <Link
                    href="/login"
                    className="text-sm font-medium text-gray-800 hover:text-gray-500"
                  >
                    Sign in
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TopHeaderDesktop;
