"use client";

import { useEffect, useState } from "react";
import { api } from "../../../../config/axios.config";
import "./FeaturedAndRecommended.css";

// Swiper React components y módulos
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Slider from "../../../molecules/Slider/Slider";
import { Image } from "react-bootstrap";

export default function FeaturedAndRecommended() {
  const [featuredAndRecommended, setFeaturedAndRecommended] = useState([]);

  const getFeaturedAndRecommended = async () => {
    const { data } = await api.get("/games/recommended");
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFeaturedAndRecommended();
      setFeaturedAndRecommended(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="section-title">FEATURED & RECOMMENDED</h2>
      <Slider
        showPagination={true}
        showNavigation={true}
        autoSlide={true}
        autoSlideDelay={4000}
        buttonSize="lg"
      >
        {featuredAndRecommended.map((game, i) => (
          <img
            key={game.id}
            src={game.mainImage}
            alt={game.name}
            className="featured-image"
          />
        ))}
      </Slider>
    </div>
  );
}
