const sheetURL = "PASTE_LINK_HERE";

async function loadQuestions() {
  const response = await fetch(sheetURL);
  const data = await response.text();

  const rows = data.split("\n").slice(1);

  window.allQuestions = rows.map(row => {
    const col = row.split(",");

    return {
      id: col[0],
      exam: col[1],
      subject: col[2],
      topic: col[3],
      difficulty: col[4],
      question: col[5],
      options: [col[6], col[7], col[8], col[9]],
      answer: col[10],
      explanation: col[11]
    };
  });

  console.log("Questions Loaded:", allQuestions.length);
}

loadQuestions();
