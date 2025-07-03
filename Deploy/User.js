  const form = document.getElementById("cadastro-form");
  const fotoInput = document.getElementById("foto");
  const previewImagem = document.getElementById("preview-imagem");

  // Mostrar pré-visualização da imagem
  fotoInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        previewImagem.src = e.target.result;
        previewImagem.style.display = "block";
      };
      reader.readAsDataURL(file);
    } else {
      previewImagem.src = "";
      previewImagem.style.display = "none";
    }
  });

  // Capturar e salvar os dados ao enviar o formulário
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // evita recarregar a página

    const nome = document.getElementById("nome").value.trim();
    const sobrenome = document.getElementById("sobrenome").value.trim();
    const serie = document.getElementById("serie").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const imagem = previewImagem.src; // imagem como base64

    // Verificação básica
    if (!nome || !sobrenome || !serie || !imagem || !email || !senha) {
      alert("Preencha todos os campos e selecione uma imagem.");
      return;
    }

    // Criar objeto com os dados do jogador
    const jogador = {
      nome,
      sobrenome,
      serie,
      email,
      senha,
      imagem
    };

    const jogadores = JSON.parse(localStorage.getItem("jogador")) || [];
    // adicinar novo jogador ao array
     jogadores.push(jogador)
    // Salvar no localStorage
    localStorage.setItem("jogador",JSON.stringify(jogadores))

    // Redirecionar para o jogo
    window.location.href = "AutoPoke.html"; // ou o nome da sua página de jogo
  });


document.addEventListener("DOMContentLoaded", () => {
  const previewImg = document.getElementById("preview-imagem");
  const fotoInput = document.getElementById("foto");
  const serieInput = document.getElementById("serie");

  // Gera número de série sequencial
  const ranking = JSON.parse(localStorage.getItem("ranking")) || [];
  const usados = ranking.map(j => parseInt(j.serie, 10)).filter(n => !isNaN(n));
  const ultimoNumero = usados.length > 0 ? Math.max(...usados) : 0;
  const proximoNumero = ultimoNumero + 1;

  serieInput.value = proximoNumero;
  serieInput.readOnly = true;

  // Clique no preview abre seletor de imagem
  document.getElementById("preview-container").addEventListener("click", () => {
    fotoInput.click();
  });

  // Preview da imagem selecionada
  fotoInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        previewImg.src = reader.result;
        previewImg.style.display = "block";
      };
      reader.readAsDataURL(file);
    }
  });
});

// Função Jogar
function gerarUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function JogarFunction() {
  const nome = document.getElementById("nome").value.trim();
  const sobrenome = document.getElementById("sobrenome").value.trim();
  const serie = document.getElementById("serie").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const previewImg = document.getElementById("preview-imagem").src;

  if (!nome || !sobrenome || !serie || !email || !senha) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  if (!previewImg || !previewImg.startsWith("data:image")) {
    alert("Por favor, selecione uma imagem antes de jogar.");
    return;
  }

  const jogador = {
    id: gerarUUID(),
    nome: `${nome} ${sobrenome}`,
    sobrenome,
    serie,
    email,
    senha,
    foto: previewImg,
    pontos: 0,
    inicio: new Date().toISOString() // Timestamp da partida
  };

  localStorage.setItem("jogadorAtual", JSON.stringify(jogador));
  window.location.href = "/AutoPoke/page/AutoPoke.html";
}

// Botão sair
function ExitButton() {
  window.location.href = "index.html";
}
