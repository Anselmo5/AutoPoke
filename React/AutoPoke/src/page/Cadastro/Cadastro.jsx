import React, { useState, useEffect, useRef } from "react";
import Swal from 'sweetalert2'

import "./Cadastro.css";

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [serie, setSerie] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [imagem, setImagem] = useState("");
  const [imagemPreview, setImagemPreview] = useState("");
  const fotoInputRef = useRef(null);

  useEffect(() => {
      document.body.classList.add("page-cadastro");
      return () => {
        document.body.classList.remove("page-cadastro");
      }
  });


  useEffect(() => {
    const jogadores = JSON.parse(localStorage.getItem("jogadores")) || [];
    const usados = jogadores.map(j => parseInt(j.serie, 10)).filter(n => !isNaN(n));
    const ultimoNumero = usados.length > 0 ? Math.max(...usados) : 0;
    setSerie(ultimoNumero + 1);
  }, []);


  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImagemPreview(ev.target.result);
        setImagem(ev.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagemPreview("");
      setImagem("");
    }
  };


  const handlePreviewClick = () => {
    fotoInputRef.current.click();
  };


const handleSubmit = (e) => {
  e.preventDefault();

  if (!nome || !sobrenome || !serie || !imagem || !email || !senha) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Preencha todos os campos e selecione uma imagem!",
    });
    return;
  }

  const novoJogador = {
    nome,
    sobrenome,
    serie,
    email,
    senha,
    foto: imagem,  
    inicio: new Date().toISOString(),
  };


  const jogadores = JSON.parse(localStorage.getItem("jogadores")) || [];  
  jogadores.push(novoJogador);
  localStorage.setItem("jogadores", JSON.stringify(jogadores));

  window.location.href = "/Jogo";
};


  // Botão sair
  const handleExit = () => {
    window.location.href = "/";
  };

  return (
    <section className="blocoUser">
      <div className="alingUser">
        <div className="Exit">
          <button type="button" onClick={handleExit}>
            <div className="sign">
              <svg viewBox="0 0 512 512">
                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
              </svg>
            </div>
            <div className="text">Exit</div>
          </button>
          <div className="TituloCadastro">
            <h2>Ficha do futuro campeão (ou não)</h2>
          </div>
        </div>

        <form id="cadastro-form" onSubmit={handleSubmit}>
          <div className="DadosUsuario">
            <div className="usuario">
              <label htmlFor="foto">Escolha sua foto:</label>
              <input
                type="file"
                id="foto"
                accept="image/*"
                ref={fotoInputRef}
                style={{ display: "none" }}
                onChange={handleImagemChange}
              />
              <div id="preview-container" onClick={handlePreviewClick}>
                {imagemPreview ? (
                  <img
                    id="preview-imagem"
                    src={imagemPreview}
                    alt="Pré-visualização"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                ) : (
                  <img
                    id="preview-imagem"
                    alt="Pré-visualização"
                    style={{ display: "none", maxWidth: "150px" }}
                  />
                )}
              </div>
            </div>
            <div className="infoUsuarios">
              {/* Nome */}
              <div className="ask-ai-wrapper">
                <div className="ai-input-container">
                  <span className="underline-effect"></span>
                  <span className="ripple-circle"></span>
                  <span className="bg-fade"></span>
                  <span className="floating-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  </span>
                  <input
                    placeholder="Nome"
                    id="nome"
                    className="ai-input"
                    type="text"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                  />
                     <span className="icon-container">
                       <svg
                          viewBox="0 0 24 24"
                          height="24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                          className="ai-icon"
                       >
                      <path
                        color="currentColor"
                        d="M7.94 3.078h8.11c1.37 0 2.47 0 3.34.12c.9.12 1.66.38 2.26.98s.86 1.36.98 2.26c.12.87.12 1.97.12 3.34v2.05c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-2c0-1.43 0-2.44-.1-3.19c-.1-.73-.28-1.12-.56-1.4s-.66-.46-1.4-.56c-.76-.1-1.76-.1-3.19-.1H8c-1.43 0-2.44 0-3.19.1c-.73.1-1.12.28-1.4.56s-.46.67-.56 1.4c-.1.76-.1 1.76-.1 3.19s0 2.44.1 3.19c.1.73.28 1.12.56 1.4s.66.46 1.4.56c.76.1 1.76.1 3.19.1h3c.41 0 .75.34.75.75s-.34.75-.75.75H7.95c-1.37 0-2.47 0-3.34-.12c-.9-.12-1.66-.38-2.26-.98s-.86-1.36-.98-2.26c-.12-.87-.12-1.97-.12-3.34v-.11c0-1.37 0-2.47.12-3.34c.12-.9.38-1.66.98-2.26s1.36-.86 2.26-.98c.87-.12 1.97-.12 3.34-.12zm8.76 10.88l-.04.09a4.34 4.34 0 0 1-2.45 2.45l-.09.04c-1.17.46-1.17 2.12 0 2.58l.09.04c1.12.44 2.01 1.33 2.45 2.45l.04.09c.46 1.17 2.12 1.17 2.58 0l.04-.09a4.34 4.34 0 0 1 2.45-2.45l.09-.04c1.17-.46 1.17-2.12 0-2.58l-.09-.04a4.34 4.34 0 0 1-2.45-2.45l-.04-.09c-.46-1.17-2.12-1.17-2.58 0m1.29.81a5.83 5.83 0 0 0 3.06 3.06a5.83 5.83 0 0 0-3.06 3.06a5.83 5.83 0 0 0-3.06-3.06a5.83 5.83 0 0 0 3.06-3.06M6.74 8.828c0-.41-.34-.75-.75-.75s-.75.34-.75.75v2c0 .41.34.75.75.75s.75-.34.75-.75zm8.25-1.75c.41 0 .75.34.75.75v4c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-4c0-.41.34-.75.75-.75m-2.25 2.25c0-.41-.34-.75-.75-.75s-.75.34-.75.75v1c0 .41.34.75.75.75s.75-.34.75-.75zm5.25-.75c.41 0 .75.34.75.75v1c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-1c0-.41.34-.75.75-.75m-8.25-.75c0-.41-.34-.75-.75-.75s-.75.34-.75.75v4c0 .41.34.75.75.75s.75-.34.75-.75z"
                        fill-rule="evenodd"
                        fill="currentColor"
                        ></path>
                    </svg>
                  </span>
                </div>
              </div>
              {/* Sobrenome */}
              <div className="ask-ai-wrapper">
                <div className="ai-input-container">
                  <span className="underline-effect"></span>
                  <span className="ripple-circle"></span>
                  <span className="bg-fade"></span>
                  <span className="floating-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  </span>
                  <input
                    placeholder="Sobrenome"
                    id="sobrenome"
                    className="ai-input"
                    type="text"
                    value={sobrenome}
                    onChange={e => setSobrenome(e.target.value)}
                  />
                   <span className="icon-container">
                       <svg
                          viewBox="0 0 24 24"
                          height="24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                          className="ai-icon"
                       >
                      <path
                        color="currentColor"
                        d="M7.94 3.078h8.11c1.37 0 2.47 0 3.34.12c.9.12 1.66.38 2.26.98s.86 1.36.98 2.26c.12.87.12 1.97.12 3.34v2.05c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-2c0-1.43 0-2.44-.1-3.19c-.1-.73-.28-1.12-.56-1.4s-.66-.46-1.4-.56c-.76-.1-1.76-.1-3.19-.1H8c-1.43 0-2.44 0-3.19.1c-.73.1-1.12.28-1.4.56s-.46.67-.56 1.4c-.1.76-.1 1.76-.1 3.19s0 2.44.1 3.19c.1.73.28 1.12.56 1.4s.66.46 1.4.56c.76.1 1.76.1 3.19.1h3c.41 0 .75.34.75.75s-.34.75-.75.75H7.95c-1.37 0-2.47 0-3.34-.12c-.9-.12-1.66-.38-2.26-.98s-.86-1.36-.98-2.26c-.12-.87-.12-1.97-.12-3.34v-.11c0-1.37 0-2.47.12-3.34c.12-.9.38-1.66.98-2.26s1.36-.86 2.26-.98c.87-.12 1.97-.12 3.34-.12zm8.76 10.88l-.04.09a4.34 4.34 0 0 1-2.45 2.45l-.09.04c-1.17.46-1.17 2.12 0 2.58l.09.04c1.12.44 2.01 1.33 2.45 2.45l.04.09c.46 1.17 2.12 1.17 2.58 0l.04-.09a4.34 4.34 0 0 1 2.45-2.45l.09-.04c1.17-.46 1.17-2.12 0-2.58l-.09-.04a4.34 4.34 0 0 1-2.45-2.45l-.04-.09c-.46-1.17-2.12-1.17-2.58 0m1.29.81a5.83 5.83 0 0 0 3.06 3.06a5.83 5.83 0 0 0-3.06 3.06a5.83 5.83 0 0 0-3.06-3.06a5.83 5.83 0 0 0 3.06-3.06M6.74 8.828c0-.41-.34-.75-.75-.75s-.75.34-.75.75v2c0 .41.34.75.75.75s.75-.34.75-.75zm8.25-1.75c.41 0 .75.34.75.75v4c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-4c0-.41.34-.75.75-.75m-2.25 2.25c0-.41-.34-.75-.75-.75s-.75.34-.75.75v1c0 .41.34.75.75.75s.75-.34.75-.75zm5.25-.75c.41 0 .75.34.75.75v1c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-1c0-.41.34-.75.75-.75m-8.25-.75c0-.41-.34-.75-.75-.75s-.75.34-.75.75v4c0 .41.34.75.75.75s.75-.34.75-.75z"
                        fill-rule="evenodd"
                        fill="currentColor"
                        ></path>
                    </svg>
                  </span>
                </div>
              </div>
              {/* Email */}
              <div className="ask-ai-wrapper">
                <div className="ai-input-container">
                  <span className="underline-effect"></span>
                  <span className="ripple-circle"></span>
                  <span className="bg-fade"></span>
                  <span className="floating-dots">
                    <span></span><span></span><span></span><span></span>
                  </span>
                  <input
                    placeholder="E-mail"
                    id="email"
                    className="ai-input"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <span className="icon-container">
                    <svg viewBox="0 0 24 24" height="24" width="24" className="ai-icon">
                      <path fill="currentColor" d="M12 13L2 6.76V18h20V6.76L12 13zm0-2.19L22 4H2l10 6.81z"/>
                    </svg>
                  </span>
                </div>
              </div>
              {/* Senha */}
              <div className="ask-ai-wrapper">
                <div className="ai-input-container">
                  <span className="underline-effect"></span>
                  <span className="ripple-circle"></span>
                  <span className="bg-fade"></span>
                  <span className="floating-dots">
                    <span></span><span></span><span></span><span></span>
                  </span>
                  <input
                    placeholder="Senha"
                    id="senha"
                    className="ai-input"
                    type="password"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                  />
                  <span className="icon-container">
                    <svg viewBox="0 0 24 24" height="24" width="24" className="ai-icon">
                      <path fill="currentColor" d="M12 17a2 2 0 0 1-2-2v-1h4v1a2 2 0 0 1-2 2m6-7h-1V7a5 5 0 0 0-10 0v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2M8 7a4 4 0 0 1 8 0v3H8Z"/>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="envioInfo">
              <div className="ask-ai-wrapper">
                <div className="ai-input-container">
                <span class="underline-effect"></span>
                  <span className="ripple-circle"></span>
                  <span className="bg-fade"></span>
                  <span className="floating-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  </span>
                  <input
                    placeholder="Número de Série"
                    id="serie"
                    className="ai-input"
                    type="text"
                    value={serie}
                    readOnly
                  />
                <span className="icon-container">
                  <svg
                    viewBox="0 0 24 24"
                    height="24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ai-icon"
                  >
                  <path
                    color="currentColor"
                    d="M7.94 3.078h8.11c1.37 0 2.47 0 3.34.12c.9.12 1.66.38 2.26.98s.86 1.36.98 2.26c.12.87.12 1.97.12 3.34v2.05c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-2c0-1.43 0-2.44-.1-3.19c-.1-.73-.28-1.12-.56-1.4s-.66-.46-1.4-.56c-.76-.1-1.76-.1-3.19-.1H8c-1.43 0-2.44 0-3.19.1c-.73.1-1.12.28-1.4.56s-.46.67-.56 1.4c-.1.76-.1 1.76-.1 3.19s0 2.44.1 3.19c.1.73.28 1.12.56 1.4s.66.46 1.4.56c.76.1 1.76.1 3.19.1h3c.41 0 .75.34.75.75s-.34.75-.75.75H7.95c-1.37 0-2.47 0-3.34-.12c-.9-.12-1.66-.38-2.26-.98s-.86-1.36-.98-2.26c-.12-.87-.12-1.97-.12-3.34v-.11c0-1.37 0-2.47.12-3.34c.12-.9.38-1.66.98-2.26s1.36-.86 2.26-.98c.87-.12 1.97-.12 3.34-.12zm8.76 10.88l-.04.09a4.34 4.34 0 0 1-2.45 2.45l-.09.04c-1.17.46-1.17 2.12 0 2.58l.09.04c1.12.44 2.01 1.33 2.45 2.45l.04.09c.46 1.17 2.12 1.17 2.58 0l.04-.09a4.34 4.34 0 0 1 2.45-2.45l.09-.04c1.17-.46 1.17-2.12 0-2.58l-.09-.04a4.34 4.34 0 0 1-2.45-2.45l-.04-.09c-.46-1.17-2.12-1.17-2.58 0m1.29.81a5.83 5.83 0 0 0 3.06 3.06a5.83 5.83 0 0 0-3.06 3.06a5.83 5.83 0 0 0-3.06-3.06a5.83 5.83 0 0 0 3.06-3.06M6.74 8.828c0-.41-.34-.75-.75-.75s-.75.34-.75.75v2c0 .41.34.75.75.75s.75-.34.75-.75zm8.25-1.75c.41 0 .75.34.75.75v4c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-4c0-.41.34-.75.75-.75m-2.25 2.25c0-.41-.34-.75-.75-.75s-.75.34-.75.75v1c0 .41.34.75.75.75s.75-.34.75-.75zm5.25-.75c.41 0 .75.34.75.75v1c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-1c0-.41.34-.75.75-.75m-8.25-.75c0-.41-.34-.75-.75-.75s-.75.34-.75.75v4c0 .41.34.75.75.75s.75-.34.75-.75z"
                    fill-rule="evenodd"
                    fill="currentColor"
                  ></path>
                 </svg>
                </span>
                </div>
              </div>
              <button className="cssbuttons-io" type="submit">
                <span>
                  <svg viewBox="0 0 24 24" height="20" width="20">
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  Jogar
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Cadastro;