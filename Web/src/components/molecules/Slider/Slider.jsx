import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./slider.css";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Slider({
  children,
  showPagination = true,
  showNavigation = true,
  autoSlide = false,
  autoSlideDelay = 3000,
  loop = true,
  slidesPerView = 1,
  buttonSize = "md"
}) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperReady, setSwiperReady] = useState(false);

  return (
    <div className={`slider-container slider-${buttonSize}`}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        pagination={showPagination ? { clickable: true } : false}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          // Asignar los botones a mano antes de que inicie Swiper
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        onSwiper={() => setSwiperReady(true)}
        autoplay={
          autoSlide
            ? { delay: autoSlideDelay, disableOnInteraction: false }
            : false
        }
        loop={loop}
        slidesPerView={slidesPerView}
        className="slider"
      >
        {children.map((child, index) => (
          <SwiperSlide key={index}>{child}</SwiperSlide>
        ))}
      </Swiper>

      {showNavigation && (
        <>
          <div ref={prevRef} className="custom-swiper-button-prev">
            <ChevronLeft size={60} strokeWidth={3} />
          </div>
          <div ref={nextRef} className="custom-swiper-button-next">
            <ChevronRight size={60} strokeWidth={3} />
          </div>
        </>
      )}
    </div>
  );
}
