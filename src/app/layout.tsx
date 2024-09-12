import Preloader from "@/components/common/Preloader";
import Footer from "@/components/shared/Footer";
import TopHeader from "@/components/shared/TopHeader";
import Hydrate from "@/providers/Hydrate";
import NextuiProvider from "@/providers/NextuiProvider";
import StoreProvider from "@/providers/StoreProvider";
import { getGlobalData } from "@/utils/getGlobalData";
import type { Metadata } from "next";
import { Jost } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import React, { PropsWithChildren, Suspense } from "react";

// Import css
import "@/styles/globals.css";
import "animate.css";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";

const jost = Jost({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: PropsWithChildren<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body suppressHydrationWarning className={jost.className}>
        <Hydrate>
          <NextTopLoader color="#FFAF45" />
          <StoreProvider>
            <NextuiProvider>
              <Suspense fallback={<Preloader />}>
                <TopHeader />
                <main>{children}</main>
                <Footer />
              </Suspense>
            </NextuiProvider>
          </StoreProvider>
        </Hydrate>
      </body>
    </html>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getGlobalData();
  return {
    title: data?.shopName,
    description: data?.description || "",
    openGraph: {
      type: "website",
      title: data?.shopName || "",
      description: data?.description || "",
      images: [
        {
          url: data?.logo || "",
          alt: data?.shopName || "",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data?.shopName || "",
      description: data?.description || "",
      creator: data?.shopName || "",
      images: [
        {
          url: data?.logo || "",
          alt: data?.shopName || "",
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
    creator: data?.shopName || "",
    icons: {
      icon: data?.logo || "",
      shortcut: data?.logo || "",
      apple: data?.logo || "",
    },
  };
}
