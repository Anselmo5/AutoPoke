import { useEffect, useState } from "react";
import "./User.css";

export default function Perfil() {
  const [jogador, setJogador] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [foto, setFoto] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const atual = JSON.parse(localStorage.getItem("jogadorAtual"));
    if (!atual) {
      window.location.href = "/login";
      return;
    }
    setJogador(atual);
  }, []);

  const abrirModal = () => {
    if (jogador) {
      setNome(jogador.nome);
      setSobrenome(jogador.sobrenome);
      setPreview(jogador.foto);
      setModalAberto(true);
    }
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target.result);
        setFoto(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const salvarEdicao = () => {
    if (!nome || !sobrenome) {
      alert("Nome e sobrenome obrigatórios.");
      return;
    }

    const jogadores = JSON.parse(localStorage.getItem("jogadores")) || [];
    const index = jogadores.findIndex(j => j.email === jogador.email);

    if (index !== -1) {
      jogadores[index] = {
        ...jogadores[index],
        nome,
        sobrenome,
        foto: foto || preview
      };
      localStorage.setItem("jogadores", JSON.stringify(jogadores));
      localStorage.setItem("jogadorAtual", JSON.stringify(jogadores[index]));
      setJogador(jogadores[index]);
      setModalAberto(false);
      alert("Perfil atualizado!");
    }
  };

  const sair = () => {
    localStorage.removeItem("jogadorAtual");
    window.location.href = "/";
  };

  if (!jogador) return null;

  return (
    <div className="perfil-container">
      <div className="PerfilSubTop">
        <img className="perfil-foto" src={jogador.foto} alt="Foto do jogador" />
        <h2>{jogador.nome} {jogador.sobrenome}</h2>
      </div>

      <div className="PerfilSubBottom">
        <div className="alingconquistas">
               <h3>Conquistas:</h3>
              <ul id="lista-conquistas">
                {(jogador.conquistas || []).map((c, i) => <li key={i}>{c}</li>)}
              </ul>
        </div>
      </div>

      <div className="perfil-buttons">
          <button id="btn-editar" onClick={abrirModal}>Editar Perfil</button>
          <button id="btn-exit" onClick={sair}>Sair</button>
      </div>

      {modalAberto && (
        <div className="modal-overlay" aria-hidden="false">
          <div className="modal-content">
            <h2>Editar Perfil</h2>

            <label>Nome</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />

            <label>Sobrenome</label>
            <input type="text" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} />

            <label>Foto</label>
            <input type="file" accept="image/*" onChange={handleFotoChange} />

            {preview && <img id="preview-foto" src={preview} alt="Preview" />}

            <div className="modal-buttons">
              <button className="btn-salvar" onClick={salvarEdicao}>Salvar</button>
              <button className="btn-cancelar" onClick={() => setModalAberto(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
