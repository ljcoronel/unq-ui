import { useParams } from "react-router";
import "../styles/Tags.css";
import { fetchGamesByTagId } from "../services/tags";
import { useEffect, useState, useRef, useCallback } from "react";
import GameCard from "../components/molecules/GameCard/GameCard";

export default function TagByTagId() {
  const { tagId } = useParams();
  const tagName = new URLSearchParams(window.location.search).get("tagName");

  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [amountOfPages, setAmountOfPages] = useState(1);

  const observerRef = useRef(null);

  useEffect(() => {
    const loadInitialGames = async () => {
      try {
        const data = await fetchGamesByTagId(tagId, 1);
        setGames(data.list);
        setAmountOfPages(Number(data.amountOfPages));
      } catch (error) {
        console.error("Error fetching initial games:", error);
      }
    };
    loadInitialGames();
    return () => {
      setGames([]);
      setCurrentPage(1);
    };
  }, [tagId]);

  useEffect(() => {
    const loadMoreGames = async () => {
      if (currentPage === 1) return;
      try {
        const data = await fetchGamesByTagId(tagId, currentPage);
        setGames((prev) => [...prev, ...data.list]);
      } catch (error) {
        console.error("Error fetching more games:", error);
      }
    };
    loadMoreGames();
  }, [currentPage]);

  const observerCallback = useCallback(
    (node) => {
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && currentPage < amountOfPages) {
          setCurrentPage((prev) => prev + 1);
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [currentPage, amountOfPages],
  );

  return (
    <section className="tags-container">
      <h2>TAG: {tagName}</h2>
      <div className="games-list">
        {games.map((game, index) => {
          const isLast = index === games.length - 1;
          return (
            <article key={game.id} ref={isLast ? observerCallback : null}>
              <GameCard game={game} />
            </article>
          );
        })}
      </div>
    </section>
  );
}
