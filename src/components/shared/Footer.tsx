"use client";

import { selectStorefrontData } from "@/redux/features/storefront/storeSlice";
import { useAppSelector } from "@/redux/hooks";
import {
  SmartphoneIcon as DevicePhoneMobileIcon,
  Mail as EnvelopeIcon,
  MapPin as MapPinIcon,
} from "lucide-react";
import Logo from "../common/Logo";
import Facebook from "@/public/icons/Facebook";
import Instragram from "@/public/icons/Instragram";
import Linkedin from "@/public/icons/Linkedin";
import Twitter from "@/public/icons/Twitter";
import Youtube from "@/public/icons/Youtube";
import Link from "next/link";

const navigation = {
  solutions: [
    { name: "Marketing", href: "#" },
    { name: "Analytics", href: "#" },
    { name: "Commerce", href: "#" },
    { name: "Insights", href: "#" },
  ],
  support: [
    { name: "Pricing", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "Guides", href: "#" },
    { name: "API Status", href: "#" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Jobs", href: "#" },
    { name: "Press", href: "#" },
    { name: "Partners", href: "#" },
  ],
  legal: [
    { name: "Claim", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
};

const socialLinks = [
  {
    Icon: Facebook,
    href: "#",
  },
  {
    Icon: Twitter,
    href: "#",
  },
  {
    Icon: Instragram,
    href: "#",
  },
  {
    Icon: Youtube,
    href: "#",
  },
  {
    Icon: Linkedin,
    href: "#",
  },
];

const Footer = () => {
  const data = useAppSelector(selectStorefrontData);
  return (
    <footer
      className="bg-[#081621] text-white"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto container px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="lg:max-w-lg max-w-full mx-auto">
            <div className="text-center sm:text-center md:text-left sm:flex sm:flex-col sm:items-center md:items-start justify-center">
              <div className="w-full flex justify-center md:justify-start">
                <Logo />
              </div>
              <p className="mt-6 text-sm leading-6 text-gray-300">
                {data ? data.description : ""}
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center space-x-2 hover:text-gray-300 transition-colors duration-200">
                <MapPinIcon className="h-5 w-5 text-gray-300" />
                <p className="text-sm leading-6 text-gray-300">
                  {data ? data.contact.address : ""}
                </p>
              </div>
              <div className="flex items-center space-x-2 hover:text-gray-300 transition-colors duration-200">
                <DevicePhoneMobileIcon className="h-5 w-5 text-gray-300" />
                <p className="text-sm leading-6 text-gray-300">
                  {data ? data.contact.phone : ""}
                </p>
              </div>
              <div className="flex items-center space-x-2 hover:text-gray-300 transition-colors duration-200">
                <EnvelopeIcon className="h-5 w-5 text-gray-300" />
                <p className="text-sm leading-6 text-gray-300">
                  {
                    <a
                      href={`mailto:${data ? data.contact.email : ""}`}
                      className="hover:text-white transition-colors duration-200"
                    >
                      {data ? data.contact.email : ""}
                    </a>
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Solutions
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white transition-colors duration-200"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Support
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white transition-colors duration-200"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Company
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white transition-colors duration-200"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">
                  Legal
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-300 hover:text-white transition-colors duration-200"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray400 pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between">
          <div>
            <h3 className="text-sm font-semibold leading-6 text-white">
              Subscribe to our newsletter
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-300">
              The latest news, articles, and resources, sent to your inbox
              weekly.
            </p>
          </div>
          <form className="mt-6 sm:flex sm:max-w-md lg:mt-0">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              className="w-full min-w-0 bg-white border-yellow border-2 px-4 py-2 text-gray400 placeholder-gray-400 outline-none   "
              name="email-address"
              placeholder="Enter your email"
            />
            <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
              <button
                type="submit"
                className="w-full min-w-0 bg-yellow text-black px-4 py-2 text-sm font-semibold leading-6 hover:bg-yellow-600 transition-colors duration-200"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
        <div className="mt-8 border-t border-gray400 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            {socialLinks.map(({ Icon, href }) => (
              <Link
                key={href}
                href={href}
                className="border rounded bg-white border-yellow p-0.5 hover:bg-blue/10 transition-colors"
              >
                <Icon />
              </Link>
            ))}
          </div>
          <p className="mt-8 text-xs leading-5 text-gray-400 md:order-1 md:mt-0">
            &copy; {new Date().getFullYear()} {data ? data.shopName : ""}. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
