import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../../App.css";
import "./Conquista.css"; 
const todasConquistas = [
  {
    id: "primeiroClique",
    titulo: "Primeiro Clique",
    descricao: "Clique pela primeira vez na Pokébola.",
    icone: "../../assets/img/pokebola.png",
  },
  {
    id: "milPontos",
    titulo: "Mil Pontos",
    descricao: "Acumule 1000 pontos no jogo.",
    icone: "../../assets/img/pokebola.png",
  },
  {
    id: "colecionador",
    titulo: "Colecionador",
    descricao: "Desbloqueie 10 Pokémons diferentes.",
    icone: "../../assets/img/pokebola.png",
  },
 
];

const Conquistas = () => {

  useEffect(() => {
    document.body.classList.add("page-conquista");
    return () => {
      document.body.classList.remove("page-conquista");
    };
  }, []);

  const [conquistasJogador, setConquistasJogador] = useState([]);

  useEffect(() => {
    const jogadorAtual = JSON.parse(localStorage.getItem("jogadorAtual")) || null;
    if (jogadorAtual && jogadorAtual.conquistas) {
      setConquistasJogador(jogadorAtual.conquistas);
    }
  }, []);

  const handleVoltar = () => {
    window.location.href = "/"; 
  };

  return (
    <main className="conquistas-container">
      <h1>Minhas Conquistas</h1>
      <section className="lista-conquistas" id="lista-conquistas">
        {todasConquistas.map((conquista) => {
          const desbloqueada = conquistasJogador.includes(conquista.id);

          return (
            <div
              key={conquista.id}
              className={`conquista-item ${desbloqueada ? "desbloqueada" : ""}`}
            >
              <img
                src={conquista.icone}
                alt={conquista.titulo}
                className="conquista-icone"
              />
              <h3 className="conquista-titulo">{conquista.titulo}</h3>
              <p className="conquista-desc">{conquista.descricao}</p>
            </div>
          );
        })}
      </section>

      <button id="voltarPerfil" className="btn-voltar" onClick={handleVoltar}>
        Voltar ao Perfil
      </button>
    </main>
  );
};

export default Conquistas;
