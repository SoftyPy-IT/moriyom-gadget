"use client";
import Link from "next/link";
import {
  RiHomeLine,
  RiUserLine,
  RiFolderLine,
  RiCalendarLine,
  RiPieChartLine,
} from "react-icons/ri";
import { IoDuplicateOutline } from "react-icons/io5";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

const navigation = [
  { name: "Panjabi", icon: RiHomeLine },
  { name: "Pants", icon: RiUserLine },
  { name: "Men", icon: RiFolderLine },
  { name: "Women", icon: RiCalendarLine },
  { name: "Jeans", icon: IoDuplicateOutline },
  { name: "Top", icon: RiPieChartLine },
  { name: "Dresses", icon: RiHomeLine },
  { name: "Accessories", icon: RiFolderLine },
  { name: "Shoes", icon: RiCalendarLine },
  { name: "Bags", icon: IoDuplicateOutline },
  { name: "More", icon: RiPieChartLine },
];

const CategoriesMenu = () => {
  return (
    <div>
      <nav className="border-t border-b border-gray-200">
        {navigation.map((item, index) => (
          <Link key={item.name} href={`/categories/${item.name}`}>
            <div
              className={`flex items-center justify-between px-3 py-2 ${
                index !== navigation.length - 1
                  ? "border-b border-gray-200"
                  : ""
              } transition-colors duration-200 ease-in-out hover:bg-gray-100`}
            >
              <div className="flex items-center space-x-2">
                <item.icon className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-800">{item.name}</span>
              </div>
              <ChevronRightIcon className="h-4 w-4 text-gray-400" />
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default CategoriesMenu;
