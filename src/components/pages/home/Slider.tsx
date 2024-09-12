"use client";

import "swiper/css";
import "swiper/css/bundle";
import { A11y, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

const data = [
  {
    id: 1,
    src: "https://www.startech.com.bd/image/cache/catalog/offer-page/free-delivery-cashback-ramadan-home-banner-982x500.png",
    alt: "Banner 1",
  },
  {
    id: 2,
    src: "https://www.startech.com.bd/image/cache/catalog/home/banner/eid-utshab/eid-uthdab-home-banner-982x500.png",
    alt: "Banner 2",
  },
  {
    id: 3,
    src: "https://www.startech.com.bd/image/cache/catalog/home/banner/ramadan-2023-ac-deal-home-banner-982x500.png",
    alt: "Banner 3",
  },
];

const Slider = () => {
  return (
    <div className="mt-5">
      <Swiper
        modules={[Navigation, Pagination, A11y, EffectFade]}
        effect="default"
        spaceBetween={30}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ clickable: true }}
        className="h-full "
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <Image
              src={item.src}
              alt={item.alt}
              layout="responsive"
              width={982}
              height={500}
              priority
              className="h-full w-full object-cover object-center"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
