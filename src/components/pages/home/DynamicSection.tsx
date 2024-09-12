"use client";

import { useGetAllSectionsQuery } from "@/redux/features/storefront/storefront.api";
import DynamicCarouselSection from "./DynamicCarouselSection";
import ProductCardSkeleton from "../products/ProductCardSkeleton";
import Card from "@/components/Card/Card";
import Container from "@/components/common/Container";

export interface ISection {
  _id: string;
  title: string;
  subTitle: string;
  description: string;
  imageUrl: string;
  products: {
    _id: string;
    name: string;
    price: number;
    thumbnail: string;
    discount_price: number;
    short_description: string;
    slug: string;
    images?: string[]; // Assuming images might be present
  }[];
  status: "active" | "inactive";
  style: "grid" | "list" | "carousel";
  perRow: number;
}

const DynamicSection = () => {
  const { data: sections, isLoading } = useGetAllSectionsQuery(undefined);
  const data = sections?.data as ISection[];

  if (isLoading) {
    return (
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {Array.from({ length: 8 }).map((_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
        </div>
      </Container>
    );
  }

  return (
    <div className="space-y-10">
      {data?.map((section, index) => {
        if (section.style === "carousel") {
          return (
            <DynamicCarouselSection
              key={index}
              section={section}
              isLoading={isLoading}
            />
          );
        } else if (section.style === "grid" || section.style === "list") {
          return <DefaultSection key={index} section={section} />;
        }
        return null;
      })}
    </div>
  );
};

// DefaultSection Component for handling grid or list layouts
const DefaultSection = ({ section }: { section: ISection }) => {
  return (
    <div className="w-full h-auto py-10 lg:py-20 border-b border-gray100">
      <Container>
        <div className="flex justify-center">
          <div className="w-3/4 mb-8 text-center sm:w-1/2 md:w-1/3">
            <h2 className="mb-4 text-3xl">{section.title}</h2>
            <span></span>
          </div>
        </div>
        <div
          className={`
          grid 
          ${section.perRow === 2 ? "grid-cols-1 sm:grid-cols-2 gap-6" : ""} 
          ${
            section.perRow === 3
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
              : ""
          } 
          ${
            section.perRow === 4
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              : ""
          } 
          ${
            section.perRow === 5
              ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
              : ""
          } 
          ${
            section.perRow === 6
              ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
              : ""
          }
        `}
        >
          {section.products.map((product) => (
            <Card
              key={product._id}
              item={{
                id: product._id,
                name: product.name,
                price: product.discount_price || product.price,
                img1: product.thumbnail,
                img2: product.images?.[0] ?? "",
                slug: product.slug,
              }}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default DynamicSection;
