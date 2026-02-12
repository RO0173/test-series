let questions = [];
let currentQuestion = 0;

const url = "https://opensheet.elk.sh/2PACX-1vQvwixEYytjBhZvE1jQW-oiDW8m3u0f5H2E-0av0brpRO7oFM6LjCdy9CsRV2Nzjz-tA6pefwbN-va0/Sheet1";

async function start() {
  let r = await fetch(url);
  let data = await r.json();

 questions = data.slice(1);
  show();
}

function show() {
  if (questions.length == 0) return;

  document.getElementById("question").innerText =
    questions[currentQuestion].question;

  let btns = document.querySelectorAll("#quiz button");

  btns[0].innerText = questions[currentQuestion].optionA;
  btns[1].innerText = questions[currentQuestion].optionB;
  btns[2].innerText = questions[currentQuestion].optionC;
  btns[3].innerText = questions[currentQuestion].optionD;
}

function checkAnswer(n) {
  let ans = questions[currentQuestion].answer;

  let correct = ["A","B","C","D"][n];

  if (ans == correct)
    document.getElementById("result").innerText = "Correct ✅";
  else
    document.getElementById("result").innerText = "Wrong ❌";

  currentQuestion++;

  if (currentQuestion < questions.length)
    setTimeout(show, 700);
  else
    document.getElementById("question").innerText = "Test Finished 🎉";
}

start();

