const question = document.querySelector(".question");
const answers = document.querySelector(".answers-grid");
const alertModal = document.querySelector(".alert-modal");
const content = document.querySelector(".content");
const questionQuantities = document.querySelector(".questionQuantities");
const nextBtn = document.querySelector(".next");
const cancelAlertModal = document.querySelector(".cancel");

const oklogout = document.querySelector(".ok");

const logout = document.querySelector(".logout");
const playerName = document.querySelector(".player-name");

import { Question } from "../DB/Question.js";
import { getCookie } from "../utils/getCookies.js";
import { setCookie } from "../utils/setCookies.js";
import "../utils/timeControll.js";

const player = getCookie("player");
playerName.innerHTML = player;

// Randomizar perguntas
const shuffledQuestions = [...Question].sort(() => Math.random() - 0.5);

// Sons de correto e errado
const correctSound = new Audio("../../../correct-answer.mp3");
const errorSound = new Audio("../../../error.mp3");

let currentIndex = 0;
let QuestionCurrects = 0;

alert;

function NextQuestion(e) {
  if (e.target.getAttribute("data-currect") == "true") {
    QuestionCurrects++;
    e.target.setAttribute("class", "green");
    // Tocar som de resposta correta
    correctSound
      .play()
      .catch((error) => console.log("Erro ao tocar som correto:", error));
  } else {
    e.target.setAttribute("class", "red");
    // Tocar som de resposta errada
    errorSound
      .play()
      .catch((error) => console.log("Erro ao tocar som erro:", error));
  }

  setTimeout(() => {
    if (currentIndex < shuffledQuestions.length - 1) {
      currentIndex++;
      LoadingQuestion();
    } else {
      finish();
    }
  }, 1000);
}

function LoadingQuestion() {
  questionQuantities.innerHTML = `${currentIndex + 1}/${
    shuffledQuestions.length
  }`;
  const item = shuffledQuestions[currentIndex];
  answers.innerHTML = "";
  question.innerHTML = item.question;

  // Randomizar as alternativas também
  const shuffledAnswers = [...item.answers].sort(() => Math.random() - 0.5);

  shuffledAnswers.forEach((answer) => {
    const div = document.createElement("div");
    div.className = "answer-option";

    div.innerHTML = `
    <p class="opc" data-currect="${answer.currect}">${answer.option}</p>
    `;

    answers.appendChild(div);
  });

  const opcs = document.querySelectorAll(".opc");
  opcs.forEach((item) => {
    // Resetar estilos
    item.style.pointerEvents = "auto";
    item.className = "opc";

    item.addEventListener("click", (e) => {
      // Desabilitar todas as opções após clique
      opcs.forEach((opc) => (opc.style.pointerEvents = "none"));
      NextQuestion(e);
    });
  });
}

LoadingQuestion();

export function finish() {
  setCookie("score", QuestionCurrects, 1);
  window.location = "./scorePage.html";
}

nextBtn.addEventListener("click", next);
function next() {
  if (currentIndex < shuffledQuestions.length - 1) {
    currentIndex++;
    LoadingQuestion();
  } else {
    finish();
  }
}

function closeAndeOpenAlertModal() {
  alertModal.classList.toggle("show");
}
cancelAlertModal.addEventListener("click", closeAndeOpenAlertModal);

logout.addEventListener("click", () => {
  closeAndeOpenAlertModal();
});

oklogout.addEventListener("click", () => {
  setCookie("player", "", 1);
  window.location = "./Thumbnail.html";
});

function removeEvent() {}
