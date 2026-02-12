let questions = [];
let currentQuestion = 0;

fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQvwixEYytjBhZvE1jQW-oiDW8m3u0f5H2E-0av0brpRO7oFM6LjCdy9CsRV2Nzjz-tA6pefwbN-va0/pub?output=csv")
  .then(res => res.text())
  .then(csv => {
    const rows = csv.split("\n").slice(1); // skip header

    rows.forEach(row => {
      const cols = row.split(",");

      if(cols.length >= 6){
        questions.push({
          question: cols[0],
          options: [cols[1], cols[2], cols[3], cols[4]],
          answer: cols[5].trim()
        });
      }
    });

    loadQuestion();
  });

function loadQuestion() {
  if(currentQuestion >= questions.length){
    document.getElementById("question").innerText = "Test Completed";
    return;
  }

  let q = questions[currentQuestion];
  document.getElementById("question").innerText = q.question;

  const buttons = document.querySelectorAll("#quiz button");
  buttons.forEach((btn,i)=> btn.innerText = q.options[i]);
}

function checkAnswer(i){
  let correct = questions[currentQuestion].answer;
  let selected = ["A","B","C","D"][i];

  document.getElementById("result").innerText =
    selected === correct ? "Correct ✅" : "Wrong ❌";

  currentQuestion++;
  setTimeout(loadQuestion,1000);
}



