export default function GameGallery({ multimedia, name }) {
  return (
    <>
      <div className="mt-4">
        <img
          src={multimedia[0].url}
          style={{ width: '1280px', height: '548px', objectFit: 'cover' }}
          alt={name}
        />
      </div>
      <div className="mt-4">
        <div className="d-flex justify-content-around">
          {multimedia.map((image, index) => (
            <img
              key={index}
              src={image.url}
              style={{ width: '200px', height: '129.36px', objectFit: 'cover' }}
              alt={name}
            />
          ))}
        </div>
      </div>
    </>
  );
}