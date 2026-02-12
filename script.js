let questions = [];
let currentQuestion = 0;

fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQvwixEYytjBhZvE1jQW-oiDW8m3u0f5H2E-0av0brpRO7oFM6LjCdy9CsRV2Nzjz-tA6pefwbN-va0/pub?output=csv")
.then(response => response.text())
.then(data => {

  const rows = data.trim().split("\n");

  // remove header row
  rows.shift();

  rows.forEach(row => {

    const cols = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);

    if(!cols || cols.length < 6) return;

    questions.push({
      question: cols[0].replaceAll('"',''),
      options: [
        cols[1].replaceAll('"',''),
        cols[2].replaceAll('"',''),
        cols[3].replaceAll('"',''),
        cols[4].replaceAll('"','')
      ],
      answer: cols[5].replaceAll('"','').trim().toUpperCase()
    });

  });

  console.log("Loaded Questions:", questions);
  loadQuestion();
});

function loadQuestion() {

  if(questions.length === 0){
    document.getElementById("question").innerText = "Loading questions...";
    return;
  }

  if(currentQuestion >= questions.length){
    document.getElementById("question").innerText = "Test Completed";
    document.getElementById("result").innerText = "";
    return;
  }

  let q = questions[currentQuestion];

  document.getElementById("question").innerText = q.question;

  const buttons = document.querySelectorAll("#quiz button");
  buttons.forEach((btn,i)=>{
    btn.innerText = q.options[i];
  });
}

function checkAnswer(i){

  let correct = questions[currentQuestion].answer;
  let selected = ["A","B","C","D"][i];

  document.getElementById("result").innerText =
    selected === correct ? "Correct ✅" : "Wrong ❌";

  currentQuestion++;
  setTimeout(loadQuestion, 1000);
}




