const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const content = document.querySelector(".content");
const questionQuantities = document.querySelector(".questionQuantities");

import { Question } from "../DB/Question.js";
import "../utils/timeControll.js";

let currentIndex = 0;
let QuestionCurrects = 0;

function NextQuestion(e) {
  if (e.target.getAttribute("data-currect") == "true") {
    QuestionCurrects++;
  }
  if (currentIndex < Question.length - 1) {
    currentIndex++;
    LoadingQuestion();
  } else {
    finish();
  }
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

function finish() {
  se;
}
