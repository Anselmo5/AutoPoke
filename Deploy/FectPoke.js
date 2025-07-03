document.addEventListener("DOMContentLoaded", () => {
  let totalPoints = 0;
  let pokemonId = 1;
  let thresholds = [0, 50, 150, 400, 900, 1800, 3500];
  let clickPower = 5;
  let score = 2;
  let tempoTotal = 1 * 60; // 1 minuto para testes

  const scoreEl = document.getElementById("score");
  const pokemonImg = document.getElementById("pokemon-img");
  const pokemonName = document.getElementById("pokemon-name");
  const dateTimeEl = document.getElementById("date-time");

  let jogador;

  try {
    jogador = JSON.parse(localStorage.getItem("jogadorAtual"));
    if (!jogador || !jogador.nome || !jogador.foto) throw new Error();
  } catch {
    alert("Nenhum jogador válido encontrado. Redirecionando...");
    window.location.href = "index.html";
    return;
  }

  document.getElementById("nome-jogador").textContent = jogador.nome;
  document.getElementById("foto-jogador").src = jogador.foto;

  function updateUI() {
    scoreEl.textContent = `Pontos: ${score}`;
  }

  async function updatePokemonImage(id) {
    pokemonImg.classList.add("hidden");
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      const imageUrl = data.sprites.other["official-artwork"].front_default;
      setTimeout(() => {
        pokemonImg.src = imageUrl;
        pokemonName.textContent = data.name;
        pokemonImg.classList.remove("hidden");
      }, 300);
    } catch (error) {
      console.error("Erro ao buscar Pokémon:", error);
    }
  }

  function showFloatingPoints(event, value) {
    const floating = document.createElement("div");
    floating.className = "floating-points";
    floating.textContent = `+${value}`;
    document.body.appendChild(floating);

    const rect = event.target.getBoundingClientRect();
    floating.style.left = `${rect.left + rect.width / 2}px`;
    floating.style.top = `${rect.top + rect.height / 2}px`;

    setTimeout(() => floating.remove(), 1000);
  }

  function updatePokeballDesign() {
    const button = document.querySelector('.pokeball-button');
    button.className = 'pokeball-button';

    if (score >= 5000) {
      button.classList.add('pokeball-beast');
      clickPower = 20;
    } else if (score >= 4000) {
      button.classList.add('pokeball-cherish');
      clickPower = 18;
    } else if (score >= 3000) {
      button.classList.add('pokeball-quick');
      clickPower = 16;
    } else if (score >= 2000) {
      button.classList.add('pokeball-dusk');
      clickPower = 14;
    } else if (score >= 1500) {
      button.classList.add('pokeball-heal');
      clickPower = 12;
    } else if (score >= 1000) {
      button.classList.add('pokeball-luxury');
      clickPower = 10;
    } else if (score >= 600) {
      button.classList.add('pokeball-master');
      clickPower = 8;
    } else if (score >= 300) {
      button.classList.add('pokeball-ultra');
      clickPower = 6;
    } else if (score >= 100) {
      button.classList.add('pokeball-great');
      clickPower = 4;
    } else {
      button.classList.add('pokeball-basic');
      clickPower = 2;
    }
  }

  function handleClick(event) {
    totalPoints += clickPower;
    score += clickPower;
    updatePokeballDesign();
    updateUI();
    showFloatingPoints(event, clickPower);

    if (pokemonId < thresholds.length - 1 && totalPoints >= thresholds[pokemonId + 1]) {
      pokemonId++;
      clickPower = 2 * pokemonId;
      updatePokemonImage(pokemonId);
    }
  }

  function formatarTempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
  }

  function iniciarTemporizador() {
    const timer = setInterval(() => {
      if (tempoTotal <= 30) {
        dateTimeEl.style.color = "#ff4d4d";
        dateTimeEl.style.fontWeight = "bold";
      }

      dateTimeEl.textContent = `⏳ Tempo restante: ${formatarTempo(tempoTotal)}`;

      if (tempoTotal <= 0) {
        clearInterval(timer);
        finalizarJogo(score);
      }

      tempoTotal--;
    }, 2000);
  }

  function finalizarJogo(pontosFinais) {
    jogador.pontos = pontosFinais;

    let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
    ranking.push(jogador);
    ranking.sort((a, b) => b.pontos - a.pontos);
    ranking = ranking.slice(0, 100); // Limita a 100 jogadores

    try {
      localStorage.setItem("ranking", JSON.stringify(ranking));
    } catch (e) {
      console.warn("Erro ao salvar no localStorage:", e);
    }

    localStorage.removeItem("jogadorAtual");

    // Mostrar modal
    document.getElementById("modal-foto").src = jogador.foto;
    document.getElementById("modal-nome").textContent = jogador.nome;
    document.getElementById("modal-pontos").textContent = jogador.totalPoints;
    document.getElementById("modal-finalizacao").classList.remove("hidden");

    document.getElementById("btn-ver-ranking").addEventListener("click", () => {
      window.location.href = "Ranking.html";
    });
  }

  // Eventos
  document.querySelector('.pokeball-button').addEventListener('click', handleClick);

  // Inicializações
  updatePokemonImage(pokemonId);
  updateUI();
  iniciarTemporizador();
});

// Tornar acessível globalmente para o botão Sair
window.ButtonExit = function () {
  window.location.href = "/AutoPoke/page/index.html";
};
