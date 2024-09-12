"use client";

import Image from "next/image";
import Logo from "../common/Logo";
import {
  SmartphoneIcon as DevicePhoneMobileIcon,
  Mail as EnvelopeIcon,
  MapPinIcon as MapPinIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  Linkedin,
} from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { selectStorefrontData } from "@/redux/features/storefront/storeSlice";
import Button from "../buttons/Button";

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

const Footer = () => {
  const data = useAppSelector(selectStorefrontData);
  return (
    <footer className="bg-white" aria-labelledby="footer-heading">
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
              <p className="mt-6 text-sm leading-6 text-gray-600">
                {data ? data.description : ""}
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center space-x-2">
                <MapPinIcon className="h-5 w56 text-gray-600" />
                <p className="text-sm leading-6 text-gray-600">
                  {data ? data.contact.address : ""}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <DevicePhoneMobileIcon className="h-5 w-5 text-gray-600" />
                <p className="text-sm leading-6 text-gray-600">
                  {data ? data.contact.phone : ""}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <EnvelopeIcon className="h-5 w-5 text-gray-600" />
                <p className="text-sm leading-6 text-gray-600">
                  {
                    <a
                      href={`mailto:${data ? data.contact.email : ""}`}
                      className="hover:text-gray-900"
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
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  Solutions
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  Support
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 hover:text-gray-900"
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
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  Company
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  Legal
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-gray-600 hover:text-gray-900"
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
        <div className="mt-16 border-t border-gray100 pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between">
          <div>
            <h3 className="text-sm font-semibold leading-6 text-gray-900">
              Subscribe to our newsletter
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              The latest news, articles, and resources, sent to your inbox
              weekly.
            </p>
          </div>
          <form className="mt-6 sm:flex sm:max-w-md lg:mt-0">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              className="border border-gray500
           py-1 px-4 outline-none"
              name="email-address"
              placeholder="Enter your email"
            />

            <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
              <Button value="Subscribe" />
            </div>
          </form>
        </div>
        <div className="mt-8 border-t border-gray100 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <a
              href={data ? data.socialMedia.facebook : "#"}
              className="text-gray-600 hover:text-gray-900"
              aria-label="Facebook"
              target="_blank"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
            <a
              href={data ? data.socialMedia.twitter : "#"}
              target="_blank"
              className="text-gray-600 hover:text-gray-900"
              aria-label="Twitter"
            >
              <TwitterIcon className="h-5 w-5" />
            </a>
            <a
              href={data ? data.socialMedia.instagram : "#"}
              target="_blank"
              className="text-gray-600 hover:text-gray-900"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={data ? data.socialMedia.linkedin : "#"}
              target="_blank"
              className="text-gray-600 hover:text-gray-900"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
          <p className="mt-8 text-xs leading-5 text-gray-500 md:order-1 md:mt-0">
            &copy; {new Date().getFullYear()} {data ? data.shopName : ""}. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
