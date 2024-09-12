"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

const images = [
  "https://dvf83rt16ac4w.cloudfront.net/upload/media/1697016522744936.png",
  "https://dvf83rt16ac4w.cloudfront.net/upload/media/1696921741654137.jpeg",
  "https://dvf83rt16ac4w.cloudfront.net/upload/media/1705405162805776.png",
  "https://dvf83rt16ac4w.cloudfront.net/upload/media/170540329445539.png",
  "https://dvf83rt16ac4w.cloudfront.net/upload/media/1705480068639651.png",
  "https://dvf83rt16ac4w.cloudfront.net/upload/media/1705404044548681.png",
  "https://dvf83rt16ac4w.cloudfront.net/upload/media/1705404324988304.png",
  "https://dvf83rt16ac4w.cloudfront.net/upload/media/1705404989575590.png",
  "https://dvf83rt16ac4w.cloudfront.net/upload/media/1705405061561714.png",
];

const Brands = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 640px)" });
  const isMediumScreen = useMediaQuery({ query: "(max-width: 1024px)" });
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (images.length > 0) {
      setKey((prevKey) => prevKey + 1); // Update key on data load
    }
  }, []);

  return (
    <div className="w-full py-12 lg:py-20 ">
      <>
        {/* Section Title */}
        <div className="text-center mb-5">
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-900">
            Leading Brands in One Place
          </h2>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Explore a wide range of popular brands across various industries.
          </p>
        </div>

        {/* Swiper Navigation */}
        <div className="flex justify-end mb-6">
          <div className="flex space-x-3">
            <button
              className="custom-swiper-button-prev-category flex items-center justify-center bg-white border border-gray300 rounded-full p-2  hover:bg-gray-100 transition-all focus:outline-none"
              aria-label="Previous slide"
            >
              <ChevronLeftIcon className="h-4 w-4 text-gray-700" />
            </button>
            <button
              className="custom-swiper-button-next-category flex items-center justify-center bg-white border border-gray300 rounded-full p-2  hover:bg-gray-100 transition-all focus:outline-none"
              aria-label="Next slide"
            >
              <ChevronRightIcon className="h-4 w-4 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Swiper Component */}
        <Swiper
          key={key}
          modules={[Navigation, Autoplay]}
          spaceBetween={isSmallScreen ? 10 : isMediumScreen ? 20 : 30}
          slidesPerView={isSmallScreen ? 2 : isMediumScreen ? 3 : 5}
          navigation={{
            nextEl: ".custom-swiper-button-next-category",
            prevEl: ".custom-swiper-button-prev-category",
          }}
          autoplay={{ delay: 3000 }}
          loop={true}
          className="relative bg-white"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="flex justify-center items-center  rounded-lg shadow-md p-4">
                <Image
                  src={image}
                  alt={`Brand ${index + 1}`}
                  width={160}
                  height={48}
                  className="object-contain max-h-16"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    </div>
  );
};

export default Brands;
