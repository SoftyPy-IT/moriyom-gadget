import AppHeader from "@/components/shared/AppHeader";
import Image from "next/image";
import Link from "next/link";

const Custom404 = () => {
  return (
    <>
      {/* <AppHeader title="Page Not Found - Moriyom Fashion" /> */}
      <div className="flex flex-col h-screen justify-center items-center bg-gray-50">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          404 - Page Not Found
        </h1>
        <Image
          src="/bg-img/404.svg"
          alt="404 Page Not Found"
          width={400}
          height={300}
          className="animate-pulse"
        />
        <span className="text-gray-600 mt-6 text-lg">
          Oops! The page you’re looking for doesn’t exist.
        </span>
        <span className="text-gray-600 mt-2">
          Go back to the{" "}
          <Link href="/">
            <span className="underline text-blue-600 font-semibold hover:text-blue-800">
              home page
            </span>
          </Link>
          .
        </span>
      </div>
    </>
  );
};

export default Custom404;
