import React from "react";
import "./UserGames.css";
import ReviewCard from "../../../molecules/ReviewCard/ReviewCard";
import GameCard from "../../../molecules/GameCard/GameCard";

export default function UserGames({ currentUser }) {
  const games = currentUser?.games || [];
  return (
    <div className="user-games">
      <h2 className="section-title">GAMES</h2>
      <div className="user-games-list">
        {games.length > 0 ? (
          games.map((game) => <GameCard game={game} withPrice={false} key={game.id}/>)
        ) : (
          <p>No games available.</p>
        )}
      </div>
    </div>
  );
}
