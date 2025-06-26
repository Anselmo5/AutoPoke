import React, { useEffect } from "react";
import "../../App.css";
import "./Formulario.css";
import "remixicon/fonts/remixicon.css";
import pokebola from "../../assets/img/pokebola.png";
import { Link } from "react-router-dom";

const Contato = () => {
  useEffect(() => {
    document.body.classList.add("page-contato");
    return () => {
      document.body.classList.remove("page-contato");
    };
  }, []);

  return (
    <>
      <header className="header" id="header">
        <nav className="nav">
          <Link to="" className="nav-logo">AutoPoke</Link>
          <div className="nav-menu" id="nav-menu">
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/About" className="nav-link">About</Link>
              </li>
              <li className="nav-item">
                <Link to="/Ranking" className="nav-link">Ranking</Link>
              </li>
              <li className="nav-item">
                <Link to="/Conquiste" className="nav-link">Conquistes</Link>
              </li>
              <li className="nav-item">
                <Link to="/Contact" className="nav-link">Contact</Link>
              </li>
            </ul>
            <div className="nav-close" id="nav-close">
              <i className="ri-close-line"></i>
            </div>
          </div>
          <div className="nav-actions">
            <Link to="/Login"><i className="ri-user-line"></i></Link>
            <i className="ri-shopping-cart-line"></i>
            <div className="nav-toggle" id="nav-toggle">
              <i className="ri-menu-line"></i>
            </div>
          </div>
        </nav>
      </header>

      <div className="container">
        <header>
          <img src={pokebola} alt="Logo AutoPoke" className="logo" />
          <h1>Entre em Contato</h1>
          <p>Tem alguma sugestão, dúvida ou encontrou um bug? Me envie uma mensagem!</p>
        </header>

        <form
          action="https://formsubmit.co/anselmohenrique191@gmail.com"
          method="POST"
          className="form"
        >
          <input type="hidden" name="_captcha" value="false" />
          <input
            type="hidden"
            name="_subject"
            value="Nova mensagem do AutoPoke!"
          />

          <label htmlFor="nome">Nome</label>
          <input type="text" id="nome" name="nome" required />

          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="mensagem">Mensagem</label>
          <textarea id="mensagem" name="mensagem" rows="5" required></textarea>

          <button type="submit">Enviar Mensagem</button>
        </form>

        <div className="voltarContact">
          <Link to="/">⬅ Voltar ao Início</Link>
     </div>

        <footer>
          <p>&copy; 2025 AutoPoke. Criado por Anselmo Henrique.</p>
        </footer>
      </div>
    </>
  );
};

export default Contato;
