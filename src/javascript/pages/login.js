const inputName = document.getElementById("name-adress");
const form = document.getElementById("form");
import { setCookie } from "../utils/setCookies.js";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = inputName.value;
  setCookie("player", name, 1);
  window.location = "./quizStarted.html";
});
