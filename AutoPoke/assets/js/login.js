document.getElementById("login-form").addEventListener("submit", function(e) {
  e.preventDefault();

  var email = document.getElementById("login-email").value.trim();
  var senha = document.getElementById("login-senha").value.trim();
  var erro = document.getElementById("erro-login");
  
  var jogadores = JSON.parse(localStorage.getItem("jogador")) || [];
  

  var jogador = null;
    jogadores.forEach(function(j) {
      if (j.email === email && j.senha === senha && jogador === null) {
        jogador = j;
      }
    });

    if(jogador){
      localStorage.setItem("jogadorAtual",JSON.stringify(jogador))
      window.location.href = "perfil.html";
    } else{
      erro.textContent = "Email ou senha inválidos."
    }
});

function ExitButton(){
  window.location.href="index.html"
}