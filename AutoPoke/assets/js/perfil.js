document.addEventListener("DOMContentLoaded", () => {
  const jogador = JSON.parse(localStorage.getItem("jogadorAtual"));
  if (!jogador) {
    alert("Você precisa fazer login.");
    window.location.href = "login.html";
    return;
  }

  // Preenche perfil
  document.getElementById("perfil-imagem").src = jogador.foto;
  document.getElementById("perfil-nome").textContent = `${jogador.nome} ${jogador.sobrenome}`;

  // Lista conquistas
  const listaConquistas = document.getElementById("lista-conquistas");
  const conquistas = jogador.conquistas || [
    "⚡ Iniciou o jogo!",
    "🥇 Primeira vitória",
    "🔥 Atingiu 100 pontos"
  ];

  listaConquistas.innerHTML = ""; // limpa
  conquistas.forEach(c => {
    const li = document.createElement("li");
    li.textContent = c;
    listaConquistas.appendChild(li);
  });

  // Modal Elements
  const modal = document.getElementById("modal-editar");
  const btnEditar = document.getElementById("btn-editar");
  const btnCancelar = document.getElementById("btn-cancelar");
  const formEditar = document.getElementById("form-editar");
  const inputNome = document.getElementById("input-nome");
  const inputSobrenome = document.getElementById("input-sobrenome");
  const inputFoto = document.getElementById("input-foto");
  const previewFoto = document.getElementById("preview-foto");

  // Abre modal e preenche inputs com dados atuais
  btnEditar.addEventListener("click", () => {
    inputNome.value = jogador.nome;
    inputSobrenome.value = jogador.sobrenome;
    previewFoto.src = jogador.foto;
    previewFoto.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
  });

  // Fecha modal ao cancelar
  btnCancelar.addEventListener("click", () => {
    modal.setAttribute("aria-hidden", "true");
    formEditar.reset();
    previewFoto.style.display = "none";
  });

  // Atualiza preview da imagem ao trocar arquivo
  inputFoto.addEventListener("change", () => {
    const file = inputFoto.files[0];
    if (!file) {
      previewFoto.style.display = "none";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      previewFoto.src = reader.result;
      previewFoto.style.display = "block";
    };
    reader.readAsDataURL(file);
  });

  // Salvar edição
  formEditar.addEventListener("submit", (e) => {
    e.preventDefault();

    const novoNome = inputNome.value.trim();
    const novoSobrenome = inputSobrenome.value.trim();

    if (!novoNome || !novoSobrenome) {
      alert("Nome e sobrenome não podem estar vazios.");
      return;
    }

    jogador.nome = novoNome;
    jogador.sobrenome = novoSobrenome;

    if (previewFoto.src && previewFoto.src.startsWith("data:image")) {
      jogador.foto = previewFoto.src;
    }

    // Atualiza localStorage
    let jogadores = JSON.parse(localStorage.getItem("jogadores")) || [];
    const index = jogadores.findIndex(j => j.email === jogador.email);

    if (index !== -1) {
      jogadores[index] = jogador;
    }
    localStorage.setItem("jogadores", JSON.stringify(jogadores));
    localStorage.setItem("jogadorAtual", JSON.stringify(jogador));

    // Atualiza UI
    document.getElementById("perfil-imagem").src = jogador.foto;
    document.getElementById("perfil-nome").textContent = `${jogador.nome} ${jogador.sobrenome}`;
    modal.setAttribute("aria-hidden", "true");
    formEditar.reset();
    previewFoto.style.display = "none";
  });
});

function ExitButton(){
  window.location.href="index.html"
}