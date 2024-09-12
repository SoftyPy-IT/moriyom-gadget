"use client";

import Card from "@/components/Card/Card";
import CardSkeleton from "@/components/Card/CardSkeleton";
import ServerErrorMessage from "@/components/common/ServerErrorMessage";
import { useGetAllProductsQuery } from "@/redux/features/products/product.api";
import { IProduct } from "@/types/products.types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Autoplay, Grid, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import featuredProducts from "./featured.json";

const FeatureProducts = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 640px)" });
  const isMediumScreen = useMediaQuery({ query: "(max-width: 1024px)" });
  // const {
  //   data: products,
  //   isLoading,
  //   error,
  // } = useGetAllProductsQuery([{ name: "is_featured", value: true }]);

  const [key, setKey] = useState(0);
  // const data = products?.data as IProduct[];

  useEffect(() => {
    if (featuredProducts.length > 0) {
      setKey((prevKey) => prevKey + 1); // Update key on data load
    }
  }, []);

  // if (error) return <ServerErrorMessage />;

  // if (!data || data.length === 0) return null;

  const isLoading = false;

  return (
    <div className="relative  my-5 ">
      <div className="flex justify-center">
        <div className="w-3/4 mb-4 text-center sm:w-1/2 md:w-1/3">
          <h2 className="mb-2 text-2xl  md:text-3xl">Featured Products</h2>
          <span className="text-sm md:text-base">
            Check & Get Your Desired Product!
          </span>
        </div>
      </div>

      <div className="ml-auto mb-5">
        <div className="flex space-x-2 justify-end">
          <button
            className={`custom-swiper-button-prev-feature flex items-center bg-white border border-gray200 rounded-full p-0.5 md:p-1 focus:outline-none`}
            aria-label="Previous feature"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <button
            className={`custom-swiper-button-next-feature flex items-center bg-white border border-gray200 rounded-full p-0.5 md:p-1 focus:outline-none`}
            aria-label="Next feature"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <Swiper
        key={key}
        modules={[Navigation, Autoplay, Grid]}
        spaceBetween={10}
        slidesPerView={isSmallScreen ? 2 : isMediumScreen ? 3 : 5}
        navigation={{
          nextEl: ".custom-swiper-button-next-feature",
          prevEl: ".custom-swiper-button-prev-feature",
        }}
        autoplay={{ delay: 3000 }}
        loop={true}
        grabCursor={true}
        grid={{
          rows: 2,
          fill: "row",
        }}
        className="mySwiper"
      >
        {isLoading
          ? Array.from({
              length: isSmallScreen ? 2 : isMediumScreen ? 3 : 5,
            }).map((_, index) => (
              <SwiperSlide key={index}>
                <CardSkeleton />
              </SwiperSlide>
            ))
          : featuredProducts?.map((product: any) => (
              <SwiperSlide key={product._id} className="swiper-slide">
                <Card
                  key={product._id}
                  item={{
                    id: product.name,
                    name: product.name,
                    price: product.price,
                    discount_price: product.discount_price,
                    img1: product.thumbnail,
                    img2: product.thumbnail,
                    slug: product.slug,
                  }}
                />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

export default FeatureProducts;
