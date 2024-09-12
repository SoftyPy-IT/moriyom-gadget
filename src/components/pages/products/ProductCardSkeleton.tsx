import { Skeleton } from "@nextui-org/react";
import React from "react";

const ProductCardSkeleton = () => {
  return (
    <>
      {Array.from({ length: 8 }).map((_, idx) => (
        <div
          key={idx}
          className="relative bg-white rounded-lg overflow-hidden border p-4 border-gray100"
        >
          <Skeleton className="h-40 w-full rounded-md" />
          <div className="w-full flex flex-col gap-2 mt-4">
            <Skeleton className="h-4 w-3/5 rounded-lg" />
            <Skeleton className="h-4 w-4/5 rounded-lg" />
            <Skeleton className="h-4 w-2/5 rounded-lg" />
            <Skeleton className="h-4 w-3/5 rounded-lg" />
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCardSkeleton;
