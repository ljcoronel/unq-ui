export default function GameHeader({ image, title }) {
  return (
    <>
      <img
        src={image}
        className="card-img-top"
        style={{ width: '1280px', height: '459px', objectFit: 'cover', objectPosition: 'top' }}
        alt={title}
      />
      <div className="position-relative">
        <div className="position-absolute start-50 translate-middle-x fw-semibold" style={{ bottom: '29.75px' }}>
          <h1 style={{ fontFamily: 'Inter', fontSize: '48px', lineHeight: '28px', color: '#EDEDED' }}>{title}</h1>
        </div>
      </div>
    </>
  );
}