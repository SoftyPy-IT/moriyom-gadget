"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

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
      setKey((prevKey) => prevKey + 1);
    }
  }, []);

  return (
    <div className="w-full py-12 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 mb-4">
            Leading Brands in One Place
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            Explore a wide range of popular brands across various industries.
          </p>
        </div>

        {/* Swiper Container with Navigation */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute right-0 -top-16 flex space-x-3">
            <button
              className="custom-swiper-button-prev-category flex items-center bg-white border border-gray200 rounded-full p-0.5 md:p-1 focus:outline-none"
              aria-label="Previous slide"
            >
              <ChevronLeftIcon className="h-5 w-5 text-gray-700" />
            </button>
            <button
              className="custom-swiper-button-next-category flex items-center bg-white border border-gray200 rounded-full p-0.5 md:p-1 focus:outline-none"
              aria-label="Next slide"
            >
              <ChevronRightIcon className="h-5 w-5 text-gray-700" />
            </button>
          </div>

          {/* Swiper Component */}
          <Swiper
            key={key}
            modules={[Navigation, Autoplay]}
            spaceBetween={isSmallScreen ? 16 : isMediumScreen ? 24 : 32}
            slidesPerView={isSmallScreen ? 2 : isMediumScreen ? 3 : 5}
            navigation={{
              nextEl: ".custom-swiper-button-next-category",
              prevEl: ".custom-swiper-button-prev-category",
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            className="px-1"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="aspect-[3/2] bg-white rounded-lg shadow-sm p-6 flex items-center justify-center transition-transform hover:scale-105">
                  <div className="relative w-full h-full">
                    <Image
                      height={80}
                      width={200}
                      src={image}
                      alt={`Brand ${index + 1}`}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Brands;
