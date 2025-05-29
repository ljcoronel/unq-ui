export default function GameRequirements({ requirement }) {
  return (
    <div className="mt-4 w-100 text-start fw-semibold fs-22 lh-28">
      <h5 className="fw-semibold">REQUIREMENTS</h5>
      <div className="fs-20">
        OS: <span className="fw-medium">{requirement.os.join(', ')}</span>
      </div>
      <div className="fs-20">
        Processor: <span className="fw-medium">{requirement.processor.join(', ')}</span>
      </div>
      <div className="fs-20">
        Memory: <span className="fw-medium">{requirement.memory}gb</span>
      </div>
      <div className="fs-20">
        Graphics: <span className="fw-medium">{requirement.graphics.join(', ')}</span>
      </div>
    </div>
  );
}
