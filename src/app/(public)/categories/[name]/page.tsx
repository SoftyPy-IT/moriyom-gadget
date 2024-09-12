import Container from "@/components/common/Container";
import CategoriesLayout from "@/components/pages/categories/CategoriesLayout";
import React from "react";
import { getCategory, getGlobalData } from "@/utils/getGlobalData";
import type { Metadata } from "next";

export default async function CategoriesPage({
  params,
}: {
  params: { name: string };
}) {
  return (
    <Container>
      <CategoriesLayout id={params.name} />
    </Container>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { name: string };
}): Promise<Metadata> {
  const data = await getGlobalData();
  const category = await getCategory(params.name);
  return {
    title: category?.name + " | " + data?.shopName || "",
    description: data?.description || "",
    openGraph: {
      images: [
        {
          url: category?.image || data?.logo || "",
          alt: category?.name || data?.shopName || "",
        },
      ],
    },
  };
}
