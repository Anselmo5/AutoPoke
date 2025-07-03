# AutoPoke

AutoPoke é um jogo idle clicker web inspirado no universo Pokémon, desenvolvido em React. O projeto permite que jogadores criem perfis, joguem partidas, conquistem pontos, desbloqueiem conquistas e disputem posições em um ranking dinâmico.

## 🚀 Funcionalidades

- **Cadastro de Jogador:** Crie seu perfil com nome, sobrenome, e-mail, senha e foto personalizada.
- **Login/Logout:** Sistema de autenticação simples para acessar e proteger seu progresso.
- **Jogo Idle Clicker:** Clique para acumular pontos, desbloquear Pokémons e evoluir no jogo.
- **Ranking:** Veja o ranking dos melhores jogadores, com pódio para os três primeiros.
- **Conquistas:** Desbloqueie conquistas especiais conforme avança no jogo.
- **Perfil do Jogador:** Visualize e edite seu perfil, conquistas e histórico.
- **Responsivo:** Interface adaptada para desktop e dispositivos móveis.
- **Design Moderno:** Visual inspirado em Pokémon, com animações e efeitos modernos.

## 🖼️ Screenshots

![Tela de Cadastro](./screenshots/cadastro.png)
![Tela do Jogo](./screenshots/jogo.png)
![Ranking](./screenshots/ranking.png)

## 🛠️ Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [Create React App](https://create-react-app.dev/)
- [CSS3](https://developer.mozilla.org/pt-BR/docs/Web/CSS) (customizado e responsivo)
- [SweetAlert2](https://sweetalert2.github.io/) (alertas e modais)
- [PokéAPI](https://pokeapi.co/) (sprites e dados dos Pokémons)
- [Google Fonts](https://fonts.google.com/)
- [Remix Icon](https://remixicon.com/)

## 📁 Estrutura do Projeto

```
src/
  assets/
    img/           # Imagens e sprites
  components/
    Header.js      # Cabeçalho e navegação
  page/
    About/         # Sobre o projeto
    Cadastro/      # Cadastro de usuário
    Conquistes/    # Conquistas do jogador
    Formulario/    # Contato
    Game/          # Página principal do jogo
    Login/         # Login de usuário
    Ranking/       # Ranking dos jogadores
    User/          # Perfil do usuário
  App.js
  index.js
```

## 👾 Como Rodar Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/AutoPoke.git
   cd AutoPoke/my-app
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm start
   ```
   O app estará disponível em [https://warm-tartufo-1f720d.netlify.app/](https://warm-tartufo-1f720d.netlify.app/).

## 📦 Build para Produção

```bash
npm run build
```
Os arquivos otimizados estarão na pasta `build/`.

## ✨ Créditos

- Sprites e dados dos Pokémons: [PokéAPI](https://pokeapi.co/)
- Design e desenvolvimento: **Anselmo Henrique**
- Fontes e ícones: [Google Fonts](https://fonts.google.com/), [Remix Icon](https://remixicon.com/)

## 📄 Licença

Este projeto é open-source sob a licença MIT.

---

> Feito com ❤️ por Anselmo Henrique — Siga-me para mais projetos!