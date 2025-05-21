import React, { useEffect, useState } from "react";
import { api } from "../../../../config/axios.config";
import GameCard from "../../../molecules/GameCard/GameCard";
import "./NewAndTrending.css";
import Pagination from "../../../molecules/Pagination/Pagination";

export default function NewAndTrending() {
  const [games, setGames] = useState([]);
  const [actualPage, setActualPage] = useState(1);
  const [pages, setPages] = useState(1);

  const getGames = async (actualPage = 1) => {
    const { data } = await api.get(`/games?page=${actualPage}`);
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const { list, currentPage, amountOfPages } = await getGames(actualPage);
      setGames(list);
      setActualPage(currentPage);
      setPages(amountOfPages);
    };

    fetchData();
  }, [actualPage]);

  return (
    <div className="new-and-trending-container">
      <h2 className="section-title">NEW & TRENDING</h2>
      <div className="list-grid">
        {games.map((game) => (
          <GameCard key={game.id} game={game} format="column" />
        ))}
      </div>
      <Pagination
        currentPage={actualPage}
        totalPages={pages}
        onPageChange={(page) => {
          setActualPage(page);
        }}
      />
    </div>
  );
}
