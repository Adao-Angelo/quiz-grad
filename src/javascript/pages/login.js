const inputName = document.getElementById("name-adress");
const form = document.getElementById("form");
import { setCookie } from "../utils/setCookies.js";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = inputName.value.trim();

  // Validação: não permite continuar se o nome estiver vazio
  if (!name || name.length < 2) {
    // Adicionar efeito visual de erro
    inputName.classList.add("error");
    inputName.setAttribute(
      "placeholder",
      "⚠️ Por favor, insira seu nome (mín. 2 caracteres)"
    );

    // Remover o erro após 3 segundos
    setTimeout(() => {
      inputName.classList.remove("error");
      inputName.setAttribute("placeholder", "Nome do explorador espacial");
    }, 3000);

    return;
  }

  setCookie("player", name, 1);
  window.location = "./quizStarted.html";
});
