import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { Home } from "lucide-react";

interface Page {
  name: string;
  href: string;
  current: boolean;
}

interface BreadcrumbProps {
  pages: Page[];
}

const Breadcrumbs: React.FC<BreadcrumbProps> = ({ pages }) => {
  return (
    <nav className="flex bg-gray100/50 mt-5 py-4" aria-label="Breadcrumb">
      <ol
        role="list"
        className="flex w-full px-4 mx-auto space-x-1 sm:px-6 lg:px-8"
      >
        <li className="flex items-center">
          <Link href="/">
            <span className="text-gray-400 hover:text-gray-500 flex items-center space-x-1">
              <Home className="w-5 h-5" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </span>
          </Link>
        </li>
        {pages.map((page, index) => (
          <li key={index} className="flex items-center capitalize">
            <ChevronRightIcon
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
            <Link
              href={page.href}
              className={` text-xs md:text-sm font-medium ${
                page.current
                  ? "text-indigo-700"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              aria-current={page.current ? "page" : undefined}
            >
              {page.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
