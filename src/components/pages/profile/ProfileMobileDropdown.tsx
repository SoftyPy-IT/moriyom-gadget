"use client";

import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { links } from "@/components/pages/profile/ProfileSidebar";
import Link from "next/link";
import classNames from "@/utils/classNames";
import { usePathname } from "next/navigation";
import {
  Bars3BottomRightIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";

const ProfileMobileDropdown = () => {
  const pathName = usePathname();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  };

  const renderDropdownItems = (): any =>
    links.map((item) => (
      <DropdownItem className="hover:bg-transparent" key={item.href}>
        <Link
          href={item.href}
          className={classNames(
            item.href === pathName ? "bg-[#F5A524]" : "",
            " flex items-center gap-3 py-2 pl-3 pr-4 text-sm font-semibold rounded-md transition-colors duration-200 w-full focus:outline-none",
          )}
        >
          <item.icon
            className={classNames("h-5 w-5", item.href === pathName ? " " : "")}
            aria-hidden="true"
          />
          <span>{item.name}</span>
        </Link>
      </DropdownItem>
    ));

  return (
    <Dropdown size="sm">
      <DropdownTrigger>
        <Button variant="flat" size="sm" className="-z-0">
          <Bars3BottomRightIcon className="h-5 w-5 -z-0" aria-hidden="true" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" color="warning">
        {renderDropdownItems()}
        <DropdownItem
          className="text-danger"
          color="danger"
          onClick={handleLogout}
        >
          <div className="flex items-center gap-3 py-2 pl-3 pr-4 text-sm font-semibold rounded-md transition-colors duration-200 w-full focus:outline-none">
            <ArrowLeftOnRectangleIcon className="h-5 w-5 " aria-hidden="true" />
            <span>Logout</span>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProfileMobileDropdown;
