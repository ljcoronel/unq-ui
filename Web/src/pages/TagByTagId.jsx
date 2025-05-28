import { useParams, useSearchParams } from "react-router";
import { fetchGamesByTagId } from "../services/tags";
import { useEffect, useState } from "react";
import GameCard from "../components/molecules/GameCard/GameCard";
import Pagination from "../components/molecules/Pagination/Pagination";
import "../styles/Tags.css";

export default function TagByTagId() {
  const { tagId } = useParams();
  const [searchParams] = useSearchParams();
  const tagName = searchParams.get("tagName") || "Unknown Tag";

  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [amountOfPages, setAmountOfPages] = useState(1);

  const loadGames = async (page) => {
    try {
      const data = await fetchGamesByTagId(tagId, page);
      setGames(data.list);
      setAmountOfPages(Number(data.amountOfPages));
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  useEffect(() => {
    loadGames(currentPage);
  }, [currentPage]);

  return (
    <section className="tags-container">
      <h2>TAG: {tagName}</h2>
      <div className="games-list">
        {games.map((game) => (
          <article key={game.id}>
            <GameCard game={game} />
          </article>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={amountOfPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </section>
  );
}
