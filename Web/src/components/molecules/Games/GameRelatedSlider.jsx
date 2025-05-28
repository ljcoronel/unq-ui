import { Link } from 'react-router-dom';
import Slider from '../../molecules/Slider/Slider.jsx';

export default function GameRelatedSlider({ relatedGames }) {
  return (
    <div className="category-slider-container">
      <Slider showPagination={false} showNavigation={true} autoSlide={false} slidesPerView={3.5} loop={false} buttonSize="md">
        {relatedGames.map((game, index) => (
          <div key={game.id || index} className="category-container">
            <Link to={`/games/${game.id}`} className="tag">
              <div className="tag-black-cover"></div>
              <img src={game.mainImage} alt={game.name} className="tag-image" />
              <span className="tag-title">{game.name}</span>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}
