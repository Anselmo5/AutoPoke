import React, { use,useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../../App.css";
import "./Login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    document.body.classList.add("page-login");
    return () => {
      document.body.classList.remove("page-login");
    };
  }, []);


  const handleLogin = (e) => {
    e.preventDefault();

    const jogadores = JSON.parse(localStorage.getItem("jogadores")) || [];

    const jogadorEncontrado = jogadores.find(
      (j) => j.email === email && j.senha === senha
    );

    if (jogadorEncontrado) {
      localStorage.setItem("jogadorAtual", JSON.stringify(jogadorEncontrado));
      window.location.href = "/Perfil"; 
      Swal.fire({
        icon: "success",
        title: "Login bem-sucedido",
        text: "Bem-vindo de volta!",
      });
    } else {
      setErro(Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Email ou senha incorretos!",
      }));
    }
  };

  const ExitButton = () => {
    window.location.href = "/";
  };

  return (
    <div className="login-container">
      <div className="Exit">
        <button onClick={ExitButton}>
          <div className="sign">
            <svg viewBox="0 0 512 512">
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
            </svg>
          </div>
          <div className="text">Exit</div>
        </button>
      </div>

      <h1>Login</h1>

      <form id="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          id="login-email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          id="login-senha"
          placeholder="Senha"
          required
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button type="submit">Entrar</button>
      </form>

      <p id="erro-login" className="erro">{erro}</p>
    </div>
  );
};

export default Login;
