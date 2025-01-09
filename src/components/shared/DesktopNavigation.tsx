"use client";

import { Dialog, Popover, Transition } from "@headlessui/react";
import { Menu as Bars3Icon, X as XMarkIcon } from "lucide-react";
import { Fragment, useState } from "react";

import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { logout, selectProfile } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import Button from "../buttons/Button";
import Logo from "../common/Logo";

const navigation = {
  pages: [
    { name: "Home", href: "/" },
    { name: "Desktops", href: "/products/desktops" },
    { name: "Laptops", href: "/products/laptops" },
    { name: "Monitors", href: "/products/monitors" },
    { name: "Accessories", href: "/products/accessories" },
    { name: "Cameras", href: "/products/cameras" },
    { name: "Smartphones", href: "/products/smartphones" },
    { name: "Tablets", href: "/products/tablets" },
    { name: "Software", href: "/products/software" },
    { name: "Services", href: "/products/services" },
  ],
};

const profileLinks = [
  { name: "Profile", href: "/profile/my-account" },
  { name: "Settings", href: "/profile/settings" },
  { name: "Orders", href: "/profile/orders" },
];

const DesktopNavigation = () => {
  const [open, setOpen] = useState(false);
  const user = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();
  const [logoutuser, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    await logoutuser(undefined);
    dispatch(logout());
    window.location.href = "/login";
  };

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex justify-between items-center px-4 pb-2 pt-5">
                  <Logo />
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <div className="space-y-6 border-t border-gray200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <Link
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </Link>
                    </div>
                  ))}
                </div>

                {!user ? (
                  <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                    <div className="flow-root">
                      <Link
                        href="/register"
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Create an account
                      </Link>
                    </div>
                    <div className="flow-root">
                      <Link
                        href="/login"
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Sign in
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 border-t border-gray200 px-4 py-6">
                    {profileLinks.map((link) => (
                      <div key={link.name} className="flow-root">
                        <Link
                          href={link.href}
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          {link.name}
                        </Link>
                      </div>
                    ))}
                    <div className="flow-root">
                      <Button
                        onClick={handleLogout}
                        value={isLoading ? "Loading..." : "Logout"}
                        extraClass="w-full"
                      />
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative">
        <nav aria-label="Top">
          <div className="bg-white w-full mx-auto py-4">
            <div className="flex items-center w-full justify-between px-4 sm:px-6 lg:px-8">
              {/* Logo */}
              <a href="#" className="lg:hidden mx-auto">
                <Logo />
              </a>

              {/* Mobile menu button */}
              <button
                type="button"
                className="lg:hidden -ml-2 rounded-md bg-white p-2 text-gray-400"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Desktop navigation */}
              <div className="hidden lg:flex items-center w-full justify-center space-x-8">
                {navigation.pages.map((page) => (
                  <Link
                    key={page.name}
                    href={page.href}
                    className="text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default DesktopNavigation;
