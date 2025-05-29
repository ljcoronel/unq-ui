import { useEffect, useState } from "react";
import { api } from "../../../../config/axios.config";
import "./BrowseByCategory.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Slider from "../../../molecules/Slider/Slider";
import { Image } from "react-bootstrap";
import TagCard from "../../../molecules/TagCard/TagCard";
import { Link } from "react-router";
import { CirclePlus } from "lucide-react";

export default function BrowseByCategory() {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const { data } = await api.get("/tags");
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCategories();
      setCategories(data.slice(0, 10));
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="section-title">BROWSE BY CATEGORY</h2>
      <div className="category-slider-container">
        <Slider
          showPagination={false}
          showNavigation={true}
          autoSlide={false}
          slidesPerView={3.5}
          loop={false}
          buttonSize="md"
        >
          {[
            ...categories.map((category, i) => (
              <div key={category.id || i} className="category-container">
                <TagCard tag={category} />
              </div>
            )),
            <div className="category-container">
              <Link key="extra" className="ver-todas" to={"/tags"}>
                <CirclePlus size={70} />
                <span>VER TODOS LOS TAGS</span>
              </Link>
            </div>,
          ]}
        </Slider>
      </div>
    </div>
  );
}
