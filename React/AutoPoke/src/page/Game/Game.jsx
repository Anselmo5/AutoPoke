import React, { useEffect, useState } from "react";
import "../../App.css";
import "./Game.css";

const thresholds = [0, 50, 150, 400, 900, 1800, 3500];

const GamePage = () => {
  const [jogador, setJogador] = useState(null);
  const [score, setScore] = useState(2);
  const [totalPoints, setTotalPoints] = useState(0);
  const [pokemonId, setPokemonId] = useState(1);
  const [pokemonName, setPokemonName] = useState("Bulbasaur");
  const [pokemonImage, setPokemonImage] = useState("");
  const [tempoRestante, setTempoRestante] = useState(60);
  const [modalVisible, setModalVisible] = useState(false);
  const [clickPower, setClickPower] = useState(5);

  useEffect(() => {
    const jogadores = JSON.parse(localStorage.getItem("jogadores")) || [];
    const ultimoJogador = jogadores[jogadores.length - 1];

    if (!ultimoJogador || !ultimoJogador.nome || !ultimoJogador.foto) {
      alert("Nenhum jogador válido encontrado. Redirecionando...");
      window.location.href = "/";
    } else {
      setJogador({
        nome: ultimoJogador.nome,
        foto: ultimoJogador.foto,
        inicio: ultimoJogador.inicio,
        pontos: 0,
      });
    }}, 
[]);

  useEffect(() => {
    if (pokemonId) updatePokemonImage(pokemonId);
  }, [pokemonId]);7


useEffect(() => {
  const timer = setInterval(() => {
    setTempoRestante((prev) => {
      if (prev <= 1) {
        clearInterval(timer);
        finalizarJogo(score); 
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [score]);  


  const updatePokemonImage = async (id) => {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();;
      setPokemonImage(data.sprites.other["official-artwork"].front_default);
      setPokemonName(data.name);
    } catch (error) {
      console.error("Erro ao buscar Pokémon:", error);
    }
  };

  const updatePokeballDesign = (newScore) => {
    const button = document.querySelector(".pokeball-button");
    button.className = "pokeball-button";

    if (newScore >= 5000) {
      button.classList.add("pokeball-beast");
      setClickPower(20);
    } else if (newScore >= 4000) {
      button.classList.add("pokeball-cherish");
      setClickPower(18);
    } else if (newScore >= 3000) {
      button.classList.add("pokeball-quick");
      setClickPower(16);
    } else if (newScore >= 2000) {
      button.classList.add("pokeball-dusk");
      setClickPower(14);
    } else if (newScore >= 1500) {
      button.classList.add("pokeball-heal");
      setClickPower(12);
    } else if (newScore >= 1000) {
      button.classList.add("pokeball-luxury");
      setClickPower(10);
    } else if (newScore >= 600) {
      button.classList.add("pokeball-master");
      setClickPower(8);
    } else if (newScore >= 300) {
      button.classList.add("pokeball-ultra");
      setClickPower(6);
    } else if (newScore >= 100) {
      button.classList.add("pokeball-great");
      setClickPower(4);
    } else {
      button.classList.add("pokeball-basic");
      setClickPower(2);
    }
  };

  const handleClick = (e) => {
    const newTotal = totalPoints + clickPower;
    const newScore = score + clickPower;

    setTotalPoints(newTotal);
    setScore(newScore);
    updatePokeballDesign(newScore);
    showFloatingPoints(e, clickPower);

    if (pokemonId < thresholds.length - 1 && newTotal >= thresholds[pokemonId + 1]) {
      setPokemonId((prev) => prev + 1);
    }
  };

  const showFloatingPoints = (event, value) => {
    const floating = document.createElement("div");
    floating.className = "floating-points";
    floating.textContent = `+${value}`;

    document.body.appendChild(floating);

    const rect = event.target.getBoundingClientRect();
    floating.style.left = `${rect.left + rect.width / 2}px`;
    floating.style.top = `${rect.top + rect.height / 2}px`;

    setTimeout(() => floating.remove(), 1000);
  };

const finalizarJogo = (pontosFinais) => {
  if (!jogador) return; 

  const jogadorFinal = { ...jogador, pontos: pontosFinais };
  let ranking = JSON.parse(localStorage.getItem("ranking")) || [];

  const jaExiste = ranking.some(j => j.numeroSerie === jogadorFinal.numeroSerie);
  if (!jaExiste) {
    ranking.push(jogadorFinal);
    ranking.sort((a, b) => b.pontos - a.pontos);
    ranking = ranking.slice(0, 100);
    localStorage.setItem("ranking", JSON.stringify(ranking));
  }

  localStorage.removeItem("jogadorAtual");
  setModalVisible(true);
};


  const formatarTempo = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${String(minutos).padStart(2, "0")}:${String(segundosRestantes).padStart(2, "0")}`;
  };

  const ButtonExit = () => {
    window.location.href = "/";
  };

  if (!jogador) return null;

  return (
    <div className="aling">
      <div className="alingUserGame">
        <div className="UserdateTime">
          <h2 id="nome-jogador">{jogador.nome}</h2>
          <div
            id="date-time"
            style={{
              color: tempoRestante <= 30 ? "#ff4d4d" : "",
              fontWeight: tempoRestante <= 30 ? "bold" : "",
            }}
          >
            ⏳ Tempo restante: {formatarTempo(tempoRestante)}
          </div>
        </div>
        <div>
          <img src={jogador.foto} id="foto-jogador" alt="" />
        </div>
      </div>

      <div className="gba-container">
        <div className="gba-controls">
          <div className="dpad">
            <div className="d-button up"></div>
            <div className="d-button left"></div>
            <div className="d-button center"></div>
            <div className="d-button right"></div>
            <div className="d-button down"></div>
          </div>
        </div>

        <div className="gba-screen">
          <h1 id="pokemon-name">{pokemonName}</h1>
          <div className="pokemon-container">
            {pokemonImage && (
              <img
                id="pokemon-img"
                src={pokemonImage}
                alt="Imagem do Pokémon atual"
              />
            )}
          </div>
          <p id="score">Pontos: {score}</p>
          <button className="pokeball-button" aria-label="Clique para ganhar pontos" onClick={handleClick}></button>

          <div className="OptionsButtons">
            <button>Select</button>
            <button onClick={ButtonExit}>Sair</button>
            <button>Options</button>
          </div>
        </div>

        <div className="action-buttons">
          <div className="a-button">A</div>
          <div className="b-button">B</div>
        </div>
      </div>

      {modalVisible && (
        <div id="modal-finalizacao" className="modal">
          <div className="modal-content">
            <img id="modal-foto" src={jogador.foto} alt="Foto do Jogador" />
            <h2 id="modal-nome">{jogador.nome}</h2>
            <p className="modal-pontos">
              Pontuação: <span id="modal-pontos">{score}</span>
            </p>
            <button id="btn-ver-ranking" onClick={() => (window.location.href = "/Ranking")}>
              Ver Ranking
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage;
