"use client";

import Container from "@/components/common/Container";
import { truncate } from "lodash";
import categories from "./categories.json";
import Link from "next/link";
import Image from "next/image";

export type TCategory = {
  _id: string;
  name: string;
  image: string;
  slug: string;
};

const CategoriesSection = () => {
  return (
    <div className="w-full h-auto py-10  border-b border-gray100">
      <>
        {/* Section Title */}
        <div className="flex justify-center">
          <div className="w-3/4 mb-8 text-center sm:w-1/2 md:w-1/3">
            <h2 className="mb-2 text-2xl  md:text-3xl">Top Categories</h2>
            <span className="text-sm md:text-base">
              Get Your Desired Product from Featured Category!
            </span>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2">
          {categories.map((category: TCategory) => (
            <Link
              href={`/categories/${category.slug}`}
              key={category._id}
              className="block p-4 bg-white rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="flex flex-col items-center justify-center text-center">
                {/* Category Image */}
                <div className="w-12 h-12 mb-2">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                {/* Category Name */}
                <h3 className="text-xs md:text-sm font-semibold">
                  {truncate(category.name, { length: 20 })}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </>
    </div>
  );
};

export default CategoriesSection;
