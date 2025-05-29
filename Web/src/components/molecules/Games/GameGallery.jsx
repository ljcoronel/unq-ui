import "./styles/GameGallery.css";
export default function GameGallery({ multimedia, name }) {
  return (
    <div className="mt-4 game-gallery-container">
      <img src={multimedia[0].url} className="gallery-main-image" alt={name} />

      <div className="mt-2">
        <div className="d-flex justify-content-between w-100">
          {multimedia.map((image, index) => (
            <img
              key={index}
              src={image.url}
              className="gallery-thumbnail"
              alt={name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
