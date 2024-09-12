import React from "react";
import { IProduct } from "@/types/products.types";
import ProductCardSkeleton from "./ProductCardSkeleton";
import Card from "@/components/Card/Card";

interface RelatedProductsProps {
  products: IProduct[];
  isLoading: boolean;
}

const RelatedProducts = ({ products, isLoading }: RelatedProductsProps) => {
  return (
    <div className="mx-auto my-8 w-full p-4 bg-white">
      <h2 className="text-lg font-semibold text-gray-800 mb-8">
        Related Products
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 lg:grid-cols-5 ">
        {isLoading ? (
          <ProductCardSkeleton />
        ) : (
          products?.map((product: IProduct) => (
            <Card
              key={product._id}
              item={{
                id: product._id,
                name: product.name,
                price: product.price,
                img1: product.thumbnail,
                img2: product?.images && product.images[0],
                slug: product.slug,
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
