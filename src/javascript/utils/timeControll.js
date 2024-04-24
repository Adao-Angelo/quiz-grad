import { finish } from "../pages/quizStarted.js";
const time = document.querySelector(".time");

const timeValure = document.querySelector(".time-value");

let TimeGame = 60;
let widthTime = 100;

setInterval(() => {
  if (TimeGame > 0) {
    timeValure.innerHTML = TimeGame;

    time.style = `width: ${widthTime}%`;
    TimeGame--;
    widthTime -= 1.67;
  } else {
    // finish();
  }
}, 1000);
