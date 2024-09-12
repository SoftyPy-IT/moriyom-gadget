import Container from "@/components/common/Container";
import ProductDetailsLayout from "@/components/pages/products/ProductDetailsLayout";

import { ParamsProps } from "@/types";

import { getGlobalData, getProducts } from "@/utils/getGlobalData";
import type { Metadata } from "next";

export default function ProductDetailsPage({ params }: ParamsProps) {
  return (
    <Container>
      <ProductDetailsLayout params={params} />
    </Container>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const data = await getGlobalData();
  const product = await getProducts(params.slug);

  return {
    title: product?.name + " | " + data?.shopName,
    description: product?.meta_description || data?.description || "",
    openGraph: {
      type: "website",
      title: product?.name || "",
      description: product?.meta_description || data?.description || "",
      images: [
        {
          url: product?.thumbnail || "",
          alt: product?.name || "",
        },
      ],
    },
    keywords: [
      "online shopping",
      "buy online",
      "ecommerce",
      "best prices",
      "discounts",
      "free shipping",
      "deals",
      "shop now",
      "secure checkout",
      "sale",
      "new arrivals",
      "exclusive offers",
      "trending products",
      "customer reviews",
      "fast delivery",
      "fashion",
      "electronics",
      "home decor",
      "beauty products",
      "health and wellness",
      "gadgets",
      "accessories",
      "clothing",
      "footwear",
      "top brands",
      "gift ideas",
      "seasonal sales",
      "online deals",
      "limited-time offers",
      "shopping deals",
    ],
    twitter: {
      card: "summary_large_image",
      title: product?.name || "",
      description: product?.meta_description || data?.description || "",
      creator: data?.shopName || "",
      images: [
        {
          url: product?.thumbnail || "",
          alt: product?.name || "",
        },
      ],
    },
  };
}
