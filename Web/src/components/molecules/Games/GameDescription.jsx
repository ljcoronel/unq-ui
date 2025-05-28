export default function GameDescription({ description }) {
  return (
    <div className="mt-4 w-100 text-start fw-semibold" style={{ fontFamily: 'Inter', fontSize: '22px', lineHeight: '28px' }}>
      <h5>ABOUT THIS GAME</h5>
      <p style={{ fontSize: '16px' }}>{description}</p>
    </div>
  );
}