const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
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

let currentIndex = 0;
let QuestionCurrects = 0;

alert;

function NextQuestion(e) {
  if (e.target.getAttribute("data-currect") == "true") {
    QuestionCurrects++;
    e.target.setAttribute("class", "green");
  } else {
    e.target.setAttribute("class", "red");
  }

  setTimeout(() => {
    if (currentIndex < Question.length - 1) {
      currentIndex++;
      LoadingQuestion();
    } else {
      finish();
    }
  }, 1000);
}

function LoadingQuestion() {
  questionQuantities.innerHTML = `${currentIndex}/${Question.length}`;
  const item = Question[currentIndex];
  answers.innerHTML = "";
  question.innerHTML = item.question;
  item.answers.forEach((answer) => {
    const div = document.createElement("div");

    div.innerHTML = `
    <p class="opc" data-currect="${answer.currect}">${answer.option}</p>
    `;

    answers.appendChild(div);
  });

  const opcs = document.querySelectorAll(".opc");
  opcs.forEach((item) => {
    item.addEventListener("click", (e) => {
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
  currentIndex++;
  LoadingQuestion();
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
