 const ranking = JSON.parse(localStorage.getItem("ranking")) || [];

    // Ordenar por pontuação
    ranking.sort((a, b) => b.pontos - a.pontos);

    // Gerar pódio
    const podium = document.getElementById("podium");
    const top3 = ranking.slice(0, 3);
    const podiumClasses = ["gold", "silver", "bronze"];

    top3.forEach((jogador, index) => {
      const div = document.createElement("div");
      div.className = `podium-item ${podiumClasses[index]}`;
      div.innerHTML = `
        <img src="${jogador.foto}" alt="Foto">
        <div>${jogador.nome}</div>
        <small>${jogador.pontos} pts</small>
      `;
      podium.appendChild(div);
    });

    // Gerar lista ranqueada
    const rankingList = document.getElementById("ranking-list");

    ranking.forEach((jogador, index) => {
      const row = document.createElement("div");
      row.className = "ranking-item";
      row.innerHTML = `
        <div class="info">
          <img src="${jogador.foto}" alt="Avatar">
          <div class="name">${jogador.nome}</div>
        </div>
        <div class="points">${jogador.pontos} pts</div>
        <div class="time">${formatarHora(jogador.inicio)}</div>
      `;
      rankingList.appendChild(row);
    });

    function formatarHora(dataStr) {
      if (!dataStr) return "--:--";
      const data = new Date(dataStr);
      return data.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
      });
    }

    function ExitButton(){
        window.location.href='index.html'
    }