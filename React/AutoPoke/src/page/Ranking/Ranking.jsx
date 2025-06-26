import React, { use, useEffect } from "react";
import "../../App.css"; 
import "./Ranking.css";

const Ranking = () => {

  useEffect(() => {
    document.body.classList.add("pge-ranking");
    return () => {
      document.body.classList.remove("pge-ranking");
    };
  }, []);


useEffect(() => {
  const ranking = JSON.parse(localStorage.getItem("ranking")) || [];

  ranking.sort((a, b) => b.pontos - a.pontos);

  // Gerar pódio
  const podiumContainer = document.getElementById("podium");
  if (podiumContainer) {
    podiumContainer.innerHTML = "";
    ranking.slice(0, 3).forEach((jogador, index) => {
      const div = document.createElement("div");
      div.className = `podium-item ${["gold", "silver", "bronze"][index]}`;
      div.innerHTML = `
        <img src="${jogador.foto}" alt="Foto" />
        <div>${jogador.nome}</div>
        <small>${jogador.pontos} pts</small>
      `;
      podiumContainer.appendChild(div);
    });
  }

  // Gerar lista completa
  const rankingListContainer = document.getElementById("ranking-list");
  if (rankingListContainer) {
    rankingListContainer.innerHTML = "";
    ranking.forEach((jogador, index) => {
      const row = document.createElement("div");
      row.className = "ranking-item";
      row.innerHTML = `
        <div class="info">
          <img src="${jogador.foto}" alt="Avatar" />
          <div class="name">${jogador.nome}</div>
        </div>
        <div class="points">${jogador.pontos} pts</div>
        <div class="time">${formatarHora(jogador.inicio)}</div>
      `;
      rankingListContainer.appendChild(row);
    });
  }
}, []);
  const formatarHora = (dataStr) => {
    if (!dataStr) return "--:--";
    const data = new Date(dataStr);
    return data.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const ExitButton = () => {
    window.location.href = "/";
  };

  return (
    <div>
      <h1>🏆 Ranking dos Jogadores</h1>

      <div className="podium" id="podium"></div>

      <div className="ranking-list" id="ranking-list"></div>

      <div className="ButtonExitRanking">
        <button onClick={ExitButton}>
          <div>EXIT RANKING</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25px"
            height="25px"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4 12.0601H14.17"
              stroke="white"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M12 4C16.42 4 20 7 20 12C20 17 16.42 20 12 20"
              stroke="white"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Ranking;
