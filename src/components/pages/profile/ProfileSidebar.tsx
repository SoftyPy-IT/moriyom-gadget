"use client";

import classNames from "@/utils/classNames";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  // BellIcon,
  // CreditCardIcon,
  CubeIcon,
  UserCircleIcon,
  // UsersIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/20/solid";
import { useAppDispatch } from "@/redux/hooks";
import { logout, setProfile } from "@/redux/features/auth/authSlice";
import { useGetProfileQuery } from "@/redux/features/auth/authApi";
import { useEffect } from "react";
import { signOut } from "next-auth/react";
export const links = [
  {
    name: "General",
    href: "/profile/my-account",
    icon: UserCircleIcon,
    current: true,
  },
  {
    name: "Settings",
    href: "/profile/settings",
    icon: Cog6ToothIcon,
    current: false,
  },
  { name: "Orders", href: "/profile/orders", icon: CubeIcon, current: false },
  // { name: "Billing", href: "#", icon: CreditCardIcon, current: false },
  // { name: "Notifications", href: "#", icon: BellIcon, current: false },
  // { name: "Team members", href: "#", icon: UsersIcon, current: false },
];

const ProfileSidebar = () => {
  const pathName = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: profile, isError, isSuccess } = useGetProfileQuery(undefined);

  const handleLogout = async () => {
    const res = await signOut({
      redirect: false,
      callbackUrl: "/login",
    });
    if (res) {
      dispatch(logout());
    }

    router.replace("/");
    router.refresh();
  };

  useEffect(() => {
    if (isSuccess && profile.data) {
      dispatch(setProfile(profile.data));
    }
  }, [isSuccess, profile, dispatch]);
  if (isError) router.refresh();

  return (
    <aside className="hidden lg:flex flex-col border-b border-gray-200 py-4 lg:w-64 lg:flex-none">
      <nav className="px-4 sm:px-6 lg:px-0 sticky top-48">
        <ul role="list" className="flex flex-col gap-2">
          {links.map((item: any) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={classNames(
                  pathName.startsWith(item.href)
                    ? "bg-indigo-100 text-indigo-600"
                    : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50",
                  "group flex items-center gap-3 py-2 pl-3 pr-4 text-sm font-semibold rounded-md transition-colors duration-200",
                )}
              >
                <item.icon
                  className={classNames(
                    "h-5 w-5",
                    pathName.startsWith(item.href)
                      ? "text-indigo-600"
                      : "text-gray-400 group-hover:text-indigo-600",
                  )}
                  aria-hidden="true"
                />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={handleLogout}
              className="text-red-500 border border-red-500 hover:bg-red-50 group flex items-center gap-3 py-2 pl-3 pr-4 text-sm font-semibold rounded-md transition-colors duration-200 w-full focus:outline-none "
            >
              <ArrowLeftStartOnRectangleIcon
                className="h-5 w-5 text-red-500 group-hover:text-red-600"
                aria-hidden="true"
              />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default ProfileSidebar;
