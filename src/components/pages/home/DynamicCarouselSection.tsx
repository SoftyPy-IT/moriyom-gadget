import Card from "@/components/Card/Card";
import CardSkeleton from "@/components/Card/CardSkeleton";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Autoplay, Grid, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ISection } from "./DynamicSection";
import Container from "@/components/common/Container";

interface SectionProps {
  section: ISection;
  isLoading: boolean;
}

const DynamicCarouselSection = ({ section, isLoading }: SectionProps) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [section]);

  const data = section.products;
  const isSmallScreen = useMediaQuery({ query: "(max-width: 640px)" });
  const isMediumScreen = useMediaQuery({ query: "(max-width: 1024px)" });

  return (
    <div className="w-full h-auto py-10 lg:py-20 border-b border-gray100">
      <Container>
        <div className="flex justify-center">
          <div className="w-3/4 mb-8 text-center sm:w-1/2 md:w-1/3">
            <h2 className="mb-4 text-3xl">{section.title}</h2>
          </div>
        </div>

        <div className="ml-auto mb-5">
          <div className="flex space-x-2 justify-end">
            <button
              className={`custom-swiper-button-prev-dynamic-section flex items-center bg-white border border-gray200 rounded-full p-0.5 md:p-1 focus:outline-none`}
              aria-label="Previous feature"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
            <button
              className={`custom-swiper-button-next-dynamic-section flex items-center bg-white border border-gray200 rounded-full p-0.5 md:p-1 focus:outline-none`}
              aria-label="Next feature"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
        <Swiper
          key={key}
          modules={[Navigation, Autoplay, Grid]}
          spaceBetween={30}
          slidesPerView={isSmallScreen ? 2 : isMediumScreen ? 3 : 5}
          navigation={{
            nextEl: ".custom-swiper-button-next-dynamic-section",
            prevEl: ".custom-swiper-button-prev-dynamic-section",
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
            : data?.map((product) => (
                <SwiperSlide key={product._id} className="swiper-slide">
                  <Card
                    key={product._id}
                    item={{
                      id: product._id,
                      name: product.name,
                      price: product.price,
                      img1: product.thumbnail,
                      img2: product.images?.[0] ?? "",
                      slug: product.slug,
                    }}
                  />
                </SwiperSlide>
              ))}
        </Swiper>
      </Container>
    </div>
  );
};

export default DynamicCarouselSection;
