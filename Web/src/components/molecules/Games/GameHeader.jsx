import "./styles/GameHeader.css";

export default function GameHeader({ image, title }) {
  return (
    <>
      <img
        src={image}
        className="card-img-top game-header-image"
        alt={title}
      />
      <div className="position-relative">
        <div className="position-absolute start-50 translate-middle-x fw-semibold game-header-title-wrapper">
          <h1 className="game-header-title">{title}</h1>
        </div>
      </div>
    </>
  );
}
