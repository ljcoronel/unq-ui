import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Slider from "../components/molecules/Slider/Slider.jsx";
import { addGameToCart, getGame } from "../services/game.js";
import { getCurrentUser } from "../services/user.js";

const Game = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const { gameId } = useParams();
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    getGame(gameId)
      .then((response) => setGame(response))
      .catch((error) => setError(error.response.data.message))
      .finally(() => setLoading(false));
  }, [gameId]);

  useEffect(() => {
    if (isLoggedIn) {
      getCurrentUser()
        .then((response) => setUser(response))
        .catch((error) => setError(error.response.data.message));
    }
  }, []);

  const addGameToCart = (gameId) => {
    if (isLoggedIn) {
      addGameToCart(gameId);
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <div className="container px-0" style={{ maxWidth: "1280px" }}>
        <img
          src={game.mainImage}
          className="card-img-top"
          style={{
            width: "1280px",
            height: "459px",
            objectFit: "cover",
            objectPosition: "top",
          }}
          alt={game.name}
        />
        <div className="position-relative">
          <div
            className="position-absolute start-50 translate-middle-x fw-semibold"
            style={{ bottom: "29.75px" }}
          >
            <h1
              style={{
                fontFamily: "Inter",
                fontSize: "48px",
                lineHeight: "28px",
                color: "#EDEDED",
              }}
            >
              {game.name}
            </h1>
          </div>
        </div>
        <div
          className="mt-4 w-100 text-start fs-5 fw-semibold"
          style={{ fontFamily: "Inter", lineHeight: "28px", color: "#212121" }}
        >
          <div>
            <span> Developer: </span>
            <span className="text-decoration-underline fw-medium">
              {game.developer.name}
            </span>
          </div>
          <div>
            <span> Website: </span>
            <span className="text-decoration-underline fw-medium">
              {game.website}
            </span>
          </div>
          <div>
            <span> Release Date: </span>
            <span className="fw-medium">{game.releaseDate.split("T")[0]}</span>
          </div>
          <div>
            <span> Tags: </span>
            {game.tags.length > 5 ? (
              <>
                {game.tags.slice(0, 5).map((tag) => (
                  <a
                    key={tag.id}
                    className="text-dark me-2 fw-medium"
                    onClick={() => navigate(`/tags/${tag.id}`)}
                  >
                    {tag.name}
                  </a>
                ))}
                <a
                  className="text-dark me-2 fw-medium"
                  data-bs-toggle="modal"
                  data-bs-target="#tagsModal"
                >
                  more...
                </a>
                <div
                  className="modal fade"
                  id="tagsModal"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5
                          className="modal-title fw-semibold"
                          id="tagsModalLabel"
                          style={{ fontSize: "32px" }}
                        >
                          All tags
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        {game.tags.map((tag, i) => (
                          <Link
                            key={i}
                            data-bs-dismiss="modal"
                            className="text-dark me-2 fw-semibold"
                            to={`/tags/${tag.id}`}
                          >
                            {tag.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              game.tags.map((tag) => (
                <a
                  key={tag.id}
                  className="text-dark me-2 fw-medium"
                  onClick={() => navigate(`/tags/${tag.id}`)}
                >
                  {tag.name}
                </a>
              ))
            )}
          </div>
        </div>
        {!user?.games.some((game) => game.id === gameId) && (
          <div className="mt-4 w-100">
            <div
              className="card w-100"
              style={{
                fontFamily: "Inter",
                backgroundColor: "#898989",
                color: "#EDEDED",
                width: "1280px",
                height: "112px",
              }}
            >
              <div className="card-body d-flex align-items-center justify-content-between">
                <div
                  className="h3 mb-0 fw-semibold"
                  style={{
                    fontSize: "32px",
                    lineHeight: "28px",
                    color: "#EDEDED",
                  }}
                >
                  Buy {game.name}
                </div>
                <div className="d-flex align-items-center gap-5">
                  <div
                    className="h3 mb-0"
                    style={{
                      fontWeight: 600,
                      fontSize: "32px",
                      lineHeight: "36px",
                      color: "#EDEDED",
                    }}
                  >
                    {game.price.currency}
                    {Math.round(game.price.amount * 10 ** 2) / 10 ** 2}
                  </div>
                  <button
                    className="btn fw-medium"
                    style={{
                      fontSize: "20px",
                      lineHeight: "28px",
                      backgroundColor: "#7DC215",
                      color: "#212121",
                      width: "172px",
                      height: "56px",
                      borderRadius: "0",
                    }}
                    onClick={() => addGameToCart(gameId)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="mt-4">
          <img
            src={game.multimedia[0].url}
            style={{ width: "1280px", height: "548px", objectFit: "cover" }}
            alt={game.name}
          />
        </div>
        <div className="mt-4">
          <div className="d-flex justify-content-around">
            {game.multimedia.map((image, index) => (
              <img
                key={index}
                src={image.url}
                style={{
                  width: "200px",
                  height: "129.36px",
                  objectFit: "cover",
                }}
                alt={game.name}
              />
            ))}
          </div>
        </div>
        <div
          className="mt-4 w-100 text-start fw-semibold"
          style={{ fontFamily: "Inter", fontSize: "22px", lineHeight: "28px" }}
        >
          <h5>ABOUT THIS GAME</h5>
          <p style={{ fontSize: "16px" }}> {game.description} </p>
        </div>
        <div
          className="mt-4 w-100 text-start fw-semibold"
          style={{ fontFamily: "Inter", fontSize: "22px", lineHeight: "28px" }}
        >
          <h5>REQUIREMENTS</h5>
          <div style={{ fontSize: "20px" }}>
            OS:
            <span className="fw-medium">{game.requirement.os.join(", ")}</span>
          </div>
          <div style={{ fontSize: "20px" }}>
            Processor
            <span className="fw-medium">
              {game.requirement.processor.join(", ")}
            </span>
          </div>
          <div style={{ fontSize: "20px" }}>
            Memory:
            <span className="fw-medium"> {game.requirement.memory}gb </span>
          </div>
          <div style={{ fontSize: "20px" }}>
            Graphics
            <span className="fw-medium">
              {game.requirement.graphics.join(", ")}
            </span>
          </div>
        </div>
        <div
          className="mt-4 w-100 text-start fw-semibold"
          style={{ fontFamily: "Inter", fontSize: "22px", lineHeight: "28px" }}
        >
          <h5>RELATED GAMES</h5>
        </div>
        <div className="category-slider-container">
          <Slider
            showPagination={false}
            showNavigation={true}
            autoSlide={false}
            slidesPerView={3.5}
            loop={false}
            buttonSize="md"
          >
            {game.relatedGames.map((game, index) => (
              <div key={game.id || index} className="category-container">
                <Link to={`/games/${game.id}`} className="tag">
                  <div className="tag-black-cover"></div>
                  <img
                    src={game.mainImage}
                    alt={game.name}
                    className="tag-image"
                  />
                  <span className="tag-title">{game.name}</span>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
        <div
          className="mt-4 w-100 text-start fw-semibold"
          style={{ fontFamily: "Inter", fontSize: "22px", lineHeight: "28px" }}
        >
          <h5>REVIEWS</h5>
        </div>
        {user?.games.some((game) => game.id === gameId) &&
          (game.reviews.some((userReview) => userReview.user.id === user.id) ? (
            <div
              className="card rounded-0 w-100"
              style={{
                backgroundColor: "#898989",
                border: "none",
                minHeight: "100px",
              }}
            >
              <div
                className="card-body p-3 fw-semibold"
                style={{
                  fontFamily: "Inter",
                  fontSize: "22px",
                  lineHeight: "28px",
                  color: "#EDEDED",
                }}
              >
                <div className="d-flex justify-content-between align-items-start">
                  <div className="d-flex align-items-center">
                    <img
                      src={user.image}
                      className="rounded-circle"
                      style={{
                        width: "53px",
                        height: "53px",
                        border: "1.5px solid #EDEDED",
                      }}
                      alt={user.name}
                    />
                    <span className="ms-3"> {user.name} </span>
                  </div>
                  <div>
                    {game.reviews.find((review) => review?.user.id === user.id)
                      .isRecommended ? (
                      <span role="img" aria-label="like">
                        👍
                      </span>
                    ) : (
                      <span role="img" aria-label="dislike">
                        👎
                      </span>
                    )}
                  </div>
                </div>
                <div className="card-body">
                  <span className="card-text">
                    {
                      game.reviews.find((review) => review?.user.id === user.id)
                        .text
                    }
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="card p-4 fw-semibold"
              style={{
                fontFamily: "Inter",
                backgroundColor: "#898989",
                borderRadius: "8px",
                border: "none",
                height: "365px",
                color: "#EDEDED",
              }}
            >
              <div className="d-flex align-items-center mb-3">
                <img
                  src={user.image}
                  className="rounded-circle"
                  style={{
                    width: "50px",
                    height: "50px",
                    border: "2px solid #EDEDED",
                  }}
                  alt={user.name}
                />
                <span
                  className="ms-3"
                  style={{ fontSize: "22px", lineHeight: "28px" }}
                >
                  {user.name}
                </span>
              </div>
              <form>
                <div className="mb-3 d-flex align-items-center">
                  <label
                    className="mb-0 me-3"
                    style={{ fontSize: "22px", lineHeight: "28px" }}
                  >
                    Recommended
                  </label>
                  <span
                    style={{ display: "inline-flex", alignItems: "center" }}
                  >
                    <span role="img" aria-label="like">
                      👍
                    </span>
                    <span role="img" aria-label="dislike">
                      👎
                    </span>
                  </span>
                </div>
                <div className="mb-2">
                  <label
                    className="mb-1"
                    style={{ fontSize: "22px", lineHeight: "28px" }}
                  >
                    Text
                  </label>
                </div>
                <div className="mb-4">
                  <textarea
                    className="form-control"
                    style={{
                      border: "none",
                      fontSize: "18px",
                      lineHeight: "24px",
                      minHeight: "90px",
                    }}
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn"
                    style={{
                      background: "#6E1D72",
                      borderRadius: "6px",
                      width: "172px",
                      height: "56px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 0,
                    }}
                  >
                    <span
                      className="fw-medium"
                      style={{ fontSize: "20px", lineHeight: "28px" }}
                    >
                      Add review
                    </span>
                  </button>
                </div>
              </form>
            </div>
          ))}
        <br />
        <div
          className="d-grid gap-5 fw-semibold"
          style={{
            gridTemplateColumns: "1fr 1fr",
            fontFamily: "Inter",
            fontSize: "22px",
            lineHeight: "28px",
          }}
        >
          {game.reviews
            .filter((review) => review.user.id !== user?.id)
            .map((review) => (
              <div
                key={review.id}
                className="card rounded-0 p-3"
                style={{
                  width: "607px",
                  height: "157px",
                  background: "#898989",
                  border: "none",
                }}
              >
                <div className="d-flex justify-content-between align-items-start">
                  <Link
                    to={`/users/${review.user.id}`}
                    className="d-flex align-items-center text-decoration-none"
                  >
                    <img
                      src={review.user.image}
                      className="rounded-circle"
                      style={{
                        width: "53px",
                        height: "53px",
                        border: "1.5px solid #EDEDED",
                      }}
                      alt={review.user.name}
                    />
                    <span className="ms-3" style={{ color: "#EDEDED" }}>
                      {review.user.name}
                    </span>
                  </Link>
                  <div>
                    {review.isRecommended ? (
                      <span role="img" aria-label="like">
                        👍
                      </span>
                    ) : (
                      <span role="img" aria-label="dislike">
                        👎
                      </span>
                    )}
                  </div>
                </div>
                <div className="card-body" style={{ color: "#EDEDED" }}>
                  <span className="card-text"> {review.text} </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Game;
