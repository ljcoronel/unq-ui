export default function GameRequirements({ requirement }) {
  return (
    <div className="mt-4 w-100 text-start fw-semibold" style={{ fontFamily: 'Inter', fontSize: '22px', lineHeight: '28px' }}>
      <h5>REQUIREMENTS</h5>
      <div style={{ fontSize: '20px' }}>OS: <span className="fw-medium">{requirement.os.join(', ')}</span></div>
      <div style={{ fontSize: '20px' }}>Processor: <span className="fw-medium">{requirement.processor.join(', ')}</span></div>
      <div style={{ fontSize: '20px' }}>Memory: <span className="fw-medium">{requirement.memory}gb</span></div>
      <div style={{ fontSize: '20px' }}>Graphics: <span className="fw-medium">{requirement.graphics.join(', ')}</span></div>
    </div>
  );
}