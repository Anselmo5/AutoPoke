import React from "react";
import { useEffect,useState} from "react";
import "./About.css";
import { Link } from "react-router-dom";
import "../../App.css";

const About = () => {
  
 useEffect(() => {
    document.body.classList.add("page-about");
    return () => {
      document.body.classList.remove("page-about");
    };
  }, []);

  return (
    <>
      <header className="header" id="header">
        <nav className="nav">
          <Link to href="" className="nav-logo">AutoPoke</Link>
          <div className="nav-menu" id="nav-menu">
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link  to="" className="nav-link">About</Link>
              </li>
              <li className="nav-item">
                <Link to="/Ranking" className="nav-link">Ranking</Link>
              </li>
              <li className="nav-item">
                <Link to="" className="nav-link">Conquistas</Link>
              </li>
              <li className="nav-item">
                <Link to="/Contact" className="nav-link">Contato</Link>
              </li>
              <li className="nav-item">
                <Link to="/Login" className="nav-link">Login</Link>
              </li>
            </ul>
            <div className="nav-close" id="nav-close">
              <i className="ri-close-line"></i>
            </div>
          </div>
          <div className="nav-actions">
            <Link to="Perfil"><i className="ri-user-line"></i></Link> 
            <i className="ri-shopping-cart-line"></i>
            <div className="nav-toggle" id="nav-toggle">
              <i className="ri-menu-line"></i>
            </div>
          </div>
        </nav>
      </header>

      <div className="containerAbout">
        <main>
          <section className="sobre">
            <h2>Sobre o Projeto</h2>
            <p>
              <strong>AutoPoke</strong> é um jogo idle clicker baseado no universo Pokémon.
              Criado com dedicação por <strong>Anselmo Henrique</strong>, esse projeto nasceu da vontade de transformar uma ideia antiga em realidade:
              fazer um jogo próprio, divertido, com Link to temática que sempre me acompanhou desde criança — Pokémon.
            </p>

            <p>
              O jogador começa com poucos pontos e vai clicando para ganhar mais. Conforme acumula pontos, desbloqueia novas Pokébolas,
              melhora o poder de clique e descobre novos Pokémons.
            </p>

            <p>
              AutoPoke é mais do que apenas um jogo. É um sonho realizado, uma experiência interativa pensada para trazer nostalgia,
              desafio e diversão para todos os fãs de Pokémon.
            </p>
          </section>

          <section className="criador">
            <h2>Sobre o Criador</h2>
            <p>
              Meu nome é <strong>Anselmo Henrique</strong>, um entusiasta de tecnologia e fã de jogos desde sempre.
              Sempre tive o sonho de criar meu próprio jogo e colocar ideias em prática com código e criatividade.
              AutoPoke representa meu primeiro passo nesse mundo de desenvolvimento de games e web.
            </p>
          </section>

          <section className="creditos">
            <h2>Créditos</h2>
            <ul>
              <li>
                Sprites e dados dos Pokémons fornecidos pela <Link to="https://pokeapi.co" target="_blank" rel="noreferrer">PokéAPI</Link>
              </li>
              <li>Design e desenvolvimento por Anselmo Henrique.</li>
              <li>
                Fontes e ícones de <Link to="https://fonts.google.com/" target="_blank" rel="noreferrer">Google Fonts</Link>to  e <Link to="https://remixicon.com/" target="_blank" rel="noreferrer">Remix Icon</Link>
              </li>
            </ul>
          </section>

          <div className="voltarAbout">
            <Link to="/">⬅ Voltar ao Início</Link>
          </div>
        </main>

        <footer>
          <p>&copy; 2025 AutoPoke. Todos os direitos reservados.</p>
        </footer>
      </div>
    </>
  );
};

export default About;
