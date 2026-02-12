let questions = [];
let currentQuestion = 0;

const url = "https://opensheet.elk.sh/2PACX-1vQvwixEYytjBhZvE1jQW-oiDW8m3u0f5H2E-0av0brpRO7oFM6LjCdy9CsRV2Nzjz-tA6pefwbN-va0/Sheet1";

async function start() {
  let r = await fetch(url);
  let data = await r.json();

  // find columns automatically
  questions = data.map(row => ({
    question: row.question || row.Question || row.ques || row.Ques,
    optionA: row.optionA || row.OptionA || row["Option A"],
    optionB: row.optionB || row.OptionB || row["Option B"],
    optionC: row.optionC || row.OptionC || row["Option C"],
    optionD: row.optionD || row.OptionD || row["Option D"],
    answer: row.answer || row.Answer
  })).filter(q => q.question);

  show();
}

function show() {
  if (!questions.length) return;

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

  document.getElementById("result").innerText =
    ans == correct ? "Correct ✅" : "Wrong ❌";

  currentQuestion++;

  if (currentQuestion < questions.length)
    setTimeout(show, 800);
  else
    document.getElementById("question").innerText = "Test Finished 🎉";
}

start();


