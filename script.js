let questions = [];
let currentQuestion = 0;

const sheetURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvwixEYytjBhZvE1jQW-oiDW8m3u0f5H2E-0av0brpRO7oFM6LjCdy9CsRV2Nzjz-tA6pefwbN-va0/pub?output=csv";

async function loadQuestions() {
  const res = await fetch(sheetURL);
  const text = await res.text();

  const rows = text.split("\n").slice(1);

  questions = rows.map(row => {
    const col = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);

    if (!col || col.length < 11) return null;

    return {
      question: col[5]?.replace(/"/g, ""),
      options: [
        col[6]?.replace(/"/g, ""),
        col[7]?.replace(/"/g, ""),
        col[8]?.replace(/"/g, ""),
        col[9]?.replace(/"/g, "")
      ],
      answer: ["A","B","C","D"].indexOf(col[10]?.replace(/"/g, "").trim())
    };
  }).filter(q => q !== null);

  showQuestion();
}

function showQuestion() {
  if (!questions.length) return;

  document.getElementById("question").innerText =
    questions[currentQuestion].question;

  const buttons = document.querySelectorAll("#quiz button");

  buttons.forEach((btn, i) => {
    btn.innerText = questions[currentQuestion].options[i];
  });
}

function checkAnswer(selected) {
  const correct = questions[currentQuestion].answer;

  document.getElementById("result").innerText =
    selected === correct ? "Correct ✅" : "Wrong ❌";

  currentQuestion++;

  if (currentQuestion < questions.length) {
    setTimeout(showQuestion, 800);
  } else {
    document.getElementById("question").innerText = "Test Completed 🎉";
  }
}

loadQuestions();

