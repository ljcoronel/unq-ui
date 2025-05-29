import { useSearchParams } from "react-router";
import "../styles/Search.css";
import { fetchGamesBySearchTerm } from "../services/search";
import { useEffect, useState } from "react";
import GameCard from "../components/molecules/GameCard/GameCard";
import Pagination from "../components/molecules/Pagination/Pagination";

export default function Search() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("query") || "Unknown";
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [amountOfPages, setAmountOfPages] = useState(1);

  const loadGames = async (page) => {
    try {
      const data = await fetchGamesBySearchTerm(searchTerm, page);
      setGames(data.list);
      setAmountOfPages(Number(data.amountOfPages));
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    loadGames(currentPage);
  }, [currentPage, searchTerm]);

  return (
    <section className="search-container">
      <h2 className="search-title">SEARCH: {searchTerm}</h2>
      <div className="search-games-list">
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
