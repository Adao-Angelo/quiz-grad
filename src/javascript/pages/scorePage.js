const complete = document.querySelector(".complete");
const scoreValue = document.querySelector(".scoreValue");
import { getCookie } from "../utils/getCookies.js";
complete.addEventListener("click", () => {
  window.location = "./login.html";
});

const score = getCookie("score");
scoreValue.innerHTML = score || "0";
