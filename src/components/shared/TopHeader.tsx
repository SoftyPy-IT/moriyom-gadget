"use client";

import { useEffect, useState } from "react";
import DesktopNavigation from "./DesktopNavigation";
import TopHeaderDesktop from "./TopHeaderDesktop";

const TopHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`bg-white z-10 ${isScrolled ? "sticky top-0 shadow-md" : ""}`}
    >
      <TopHeaderDesktop />
      <div className="mx-auto container px-2 sm:px-4 lg:px-8 lg:divide-y  lg:divide-gray200">
        <DesktopNavigation />
      </div>
    </div>
  );
};

export default TopHeader;
