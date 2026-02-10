const questions = [
  {
    question: "What is 2 + 2?",
    options: ["1", "2", "3", "4"],
    answer: 3
  },
  {
    question: "Capital of India?",
    options: ["Mumbai", "Delhi", "Chennai", "Kolkata"],
    answer: 1
  },
  {
    question: "Which is a programming language?",
    options: ["HTML", "CSS", "Python", "Internet"],
    answer: 2
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const buttons = document.querySelectorAll("button");
const resultEl = document.getElementById("result");

function loadQuestion() {
  questionEl.innerText = questions[currentQuestion].question;
  buttons.forEach((btn, index) => {
    btn.innerText = questions[currentQuestion].options[index];
  });
}

function checkAnswer(selected) {
  if (selected === questions[currentQuestion].answer) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    document.getElementById("quiz").innerHTML =
      `<h2>Test Completed 🎉</h2>
       <p>Your Score: ${score} / ${questions.length}</p>`;
  }
}

loadQuestion();
