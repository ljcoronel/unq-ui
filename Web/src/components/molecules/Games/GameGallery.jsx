import "./styles/GameGallery.css";
export default function GameGallery({ multimedia, name }) {
  return (
    <>
      <div className="mt-4">
        <img
          src={multimedia[0].url}
          className="gallery-main-image"
          alt={name}
        />
      </div>
      <div className="mt-4">
        <div className="d-flex justify-content-around">
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
    </>
  );
}
