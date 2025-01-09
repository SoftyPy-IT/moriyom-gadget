"use client";
import React from "react";
import ProductDetails from "@/components/pages/products/ProductDetails";
import ProductOverview from "@/components/pages/products/ProductOverview";
import RelatedProducts from "@/components/pages/products/RelatedProducts";
import { useGetProductDetailsQuery } from "@/redux/features/products/product.api";
import { IProduct } from "@/types/products.types";
import data from "./product.json";

interface IParams {
  slug: string;
}

const ProductDetailsLayout = ({ params }: { params: IParams }) => {
  // const { data, isLoading } = useGetProductDetailsQuery(params.slug) as any;

  // const product = data?.product as IProduct;
  // const relatedProducts = data?.relatedProducts as Partial<IProduct>[];
  const product = data.data.product as unknown as Partial<IProduct>;
  const relatedProducts = data.data
    .relatedProducts as unknown as Partial<IProduct>[];
  return (
    <>
      <ProductOverview product={product as any} isLoading={false} />
      <ProductDetails product={product as any} />
      <RelatedProducts products={relatedProducts as any} isLoading={false} />
    </>
  );
};

export default ProductDetailsLayout;
