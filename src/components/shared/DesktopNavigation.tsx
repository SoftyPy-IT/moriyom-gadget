"use client";

import { Fragment, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import { Menu as Bars3Icon, X as XMarkIcon } from "lucide-react";
import WishlistIcon from "./WishlistIcon";

import Link from "next/link";
import Logo from "../common/Logo";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectProfile } from "@/redux/features/auth/authSlice";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import CartItem from "../Cart/CartItem";
import Button from "../buttons/Button";

const navigation = {
  pages: [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/products" },
    { name: "About", href: "#" },
    { name: "Contact", href: "#" },
    { name: "Track Order", href: "/track-order" },
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
                <div className="flex px-4 pb-2 pt-5">
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
                      <a
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                {!user ? (
                  <div className="space-y-6 border-t border-gray200 px-4 py-6">
                    <div className="flow-root">
                      <a
                        href="/register"
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Create an account
                      </a>
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
                    <div className="flow-root">
                      {profileLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                    <div className="flow-root">
                      <Button
                        onClick={handleLogout}
                        value={isLoading ? "Loading..." : "Logout"}
                        extraClass="w-full"
                      />
                    </div>
                  </div>
                )}

                {/* <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  
                </div> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative">
        <nav aria-label="Top">
          {/* Secondary navigation */}
          <div className="bg-white ">
            <div className="">
              <div className="">
                <div className="flex h-16 items-center justify-between">
                  <div className="hidden h-full lg:flex">
                    {/* Mega menus */}
                    <Popover.Group>
                      <div className="flex h-full justify-center space-x-8">
                        {navigation.pages.map((page) => (
                          <Link
                            key={page.name}
                            href={page.href}
                            className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                          >
                            {page.name}
                          </Link>
                        ))}
                      </div>
                    </Popover.Group>
                  </div>

                  {/* Mobile menu and search (lg-) */}
                  <div className="flex  items-center justify-between lg:hidden">
                    <button
                      type="button"
                      className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setOpen(true)}
                    >
                      <span className="sr-only">Open menu</span>
                      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Logo (lg-) */}
                  <a href="#" className="lg:hidden">
                    <span className="sr-only">Your Company</span>
                    <Logo />
                  </a>

                  <div className="flex  items-center space-x-6">
                    <WishlistIcon />
                    <CartItem />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default DesktopNavigation;
