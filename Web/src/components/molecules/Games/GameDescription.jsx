import "./styles/GameDescription.css";

export default function GameDescription({ description }) {
  return (
    <div className="mt-4 w-100 text-start fw-semibold game-description-container">
      <h5>ABOUT THIS GAME</h5>
      <p className="game-description-text">{description}</p>
    </div>
  );
}
