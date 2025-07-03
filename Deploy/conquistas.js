// Conquistas possíveis (exemplo)
const todasConquistas = [
  {
    id: "primeiroClique",
    titulo: "Primeiro Clique",
    descricao: "Clique pela primeira vez na Pokébola.",
    icone: "icons/primeiro_clique.png"
  },
  {
    id: "milPontos",
    titulo: "Mil Pontos",
    descricao: "Acumule 1000 pontos no jogo.",
    icone: "icons/mil_pontos.png"
  },
  {
    id: "colecionador",
    titulo: "Colecionador",
    descricao: "Desbloqueie 10 Pokémons diferentes.",
    icone: "icons/colecionador.png"
  },
  // ... mais conquistas
];

// Recupera jogador atual e suas conquistas
const jogadorAtual = JSON.parse(localStorage.getItem("jogadorAtual")) || null;
const conquistasJogador = jogadorAtual?.conquistas || [];

// Referência ao container das conquistas
const container = document.getElementById("lista-conquistas");

// Renderiza as conquistas
todasConquistas.forEach(conquista => {
  const desbloqueada = conquistasJogador.includes(conquista.id);

  const div = document.createElement("div");
  div.className = "conquista-item" + (desbloqueada ? " desbloqueada" : "");

  div.innerHTML = `
    <img src="${"pokebola.png"}" alt="${conquista.titulo}" class="conquista-icone" />
    <h3 class="conquista-titulo">${conquista.titulo}</h3>
    <p class="conquista-desc">${conquista.descricao}</p>
  `;

  container.appendChild(div);
});

// Voltar ao perfil
document.getElementById("voltarPerfil").addEventListener("click", () => {
  window.location.href = "index.html"; // ajuste a rota conforme seu projeto
});
