  let totalPoints = 0;
  let pokemonId = 1;
  let thresholds = [0, 50, 150, 400, 900, 1800, 3500]; // Pode crescer mais
  let clickPower = 5;
  let score = 2;

  const scoreEl = document.getElementById("score");
  const pokemonImg = document.getElementById("pokemon-img");
  const pokemonName = document.getElementById("pokemon-name");

  function updateUI() {
    scoreEl.textContent = `Pontos: ${totalPoints}`;
  }

async function updatePokemonImage(id) {
  pokemonImg.classList.add("hidden");
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();
  const imageUrl = data.sprites.other["official-artwork"].front_default;
  setTimeout(() => {
    pokemonImg.src = imageUrl;
    pokemonName.textContent = data.name;
    pokemonImg.classList.remove("hidden");
  }, 300);
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

  // update design pokebolas


  function updatePokeballDesign() {
    const button = document.querySelector('.pokeball-button');
    button.className='pokeball-button';

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
    document.getElementById("score").textContent = `Pontos: ${score}`;
    updatePokeballDesign();
    updateUI();
    showFloatingPoints(event, clickPower);

    if (pokemonId < thresholds.length - 1 && totalPoints >= thresholds[pokemonId + 1]) {
      pokemonId++;
      clickPower = 2 * pokemonId;
      updatePokemonImage(pokemonId);
    }
  }

  // Inicializa
  updatePokemonImage(pokemonId);
  updateUI();
