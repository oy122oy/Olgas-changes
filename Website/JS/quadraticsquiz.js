var score = 0;
var answered = [];

var questions = [
  {
    q: "What is 7 × 8?",
    options: ["54", "56", "63", "48"],
    correct: 1,
  },
  {
    q: "Solve: x + 5 = 12",
    options: ["x = 5", "x = 7", "x = 17", "x = 6"],
    correct: 1,
  },
  {
    q: "What is 15% of 200?",
    options: ["25", "20", "30", "15"],
    correct: 2,
  },
  {
    q: "Simplify: 3x + 2x",
    options: ["6x", "5x", "5x²", "3x²"],
    correct: 1,
  },
  {
    q: "What is the area of a rectangle 6cm × 4cm?",
    options: ["10cm²", "20cm²", "24cm²", "28cm²"],
    correct: 2,
  },
  {
    q: "What is √144?",
    options: ["11", "14", "12", "13"],
    correct: 2,
  },
  {
    q: "Solve: 2x - 3 = 11",
    options: ["x = 4", "x = 7", "x = 8", "x = 5"],
    correct: 1,
  },
  {
    q: "What is 3² + 4²?",
    options: ["25", "14", "49", "30"],
    correct: 0,
  },
  {
    q: "A bag has 3 red, 2 blue, 5 green balls. What is the probability of picking red?",
    options: ["3/5", "1/2", "3/10", "1/3"],
    correct: 2,
  },
  {
    q: "What is the perimeter of a square with side 7cm?",
    options: ["21cm", "28cm", "49cm", "14cm"],
    correct: 1,
  },
  {
    q: "Expand: 3(2x + 4)",
    options: ["6x + 4", "5x + 7", "6x + 12", "2x + 12"],
    correct: 2,
  },
  {
    q: "What is the gradient of y = 3x + 5?",
    options: ["5", "3", "8", "1"],
    correct: 1,
  },
  {
    q: "Factorise: x² + 5x + 6",
    options: ["(x+2)(x+3)", "(x+1)(x+6)", "(x+3)(x+2)", "(x-2)(x-3)"],
    correct: 0,
  },
  {
    q: "What is 0.3 as a fraction in its simplest form?",
    options: ["3/100", "1/3", "3/10", "30/100"],
    correct: 2,
  },
  {
    q: "The mean of 4, 7, 9, 10, 5 is:",
    options: ["6", "7", "8", "9"],
    correct: 1,
  },
  {
    q: "What is 2³ × 2²?",
    options: ["2⁵", "2⁶", "4⁵", "2¹"],
    correct: 0,
  },
  {
    q: "Solve: 5x = 35",
    options: ["x = 6", "x = 8", "x = 7", "x = 5"],
    correct: 2,
  },
  {
    q: "What is the volume of a cube with side 3cm?",
    options: ["9cm³", "18cm³", "27cm³", "12cm³"],
    correct: 2,
  },
  {
    q: "Which is the largest: 0.6, 3/5, 58%, 0.605?",
    options: ["0.6", "3/5", "58%", "0.605"],
    correct: 3,
  },
  {
    q: "Solve: x/4 = 5",
    options: ["x = 1", "x = 9", "x = 20", "x = 15"],
    correct: 2,
  },
];

function buildQuiz() {
  var container = document.getElementById("quizContainer");
  var html = "";

  for (var i = 0; i < questions.length; i++) {
    html += '<div class="quizQuestion" id="q' + i + '">';
    html += '<p class="quizQText">' + (i + 1) + ". " + questions[i].q + "</p>";
    html += '<div class="quizOptions">';
    for (var j = 0; j < questions[i].options.length; j++) {
      html +=
        '<button class="quizOption" onclick="checkAnswer(' +
        i +
        "," +
        j +
        ')">' +
        questions[i].options[j] +
        "</button>";
    }
    html += "</div></div>";
  }

  html += '<div id="quizScore">Score: 0 / ' + questions.length + "</div>";
  container.innerHTML = html;
}

function checkAnswer(qIndex, chosen) {
  if (answered[qIndex]) return;
  answered[qIndex] = true;

  var buttons = document.querySelectorAll("#q" + qIndex + " .quizOption");
  var correct = questions[qIndex].correct;

  if (chosen === correct) {
    score++;
    buttons[chosen].classList.add("correct");
  } else {
    buttons[chosen].classList.add("wrong");
    buttons[correct].classList.add("correct");
  }

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }

  document.getElementById("quizScore").textContent =
    "Score: " + score + " / " + questions.length;
}

window.onload = buildQuiz;

function goToSaveScore() {
 
  let quizName = "Quadratics Quiz";

  // saving on local storage for json to read it
  localStorage.setItem("currentQuizScore",        score);         
  localStorage.setItem("currentTotalQuestions",   questions.length); // total questions
  localStorage.setItem("currentQuizName",         quizName);

  // going to sacescore page   
  window.location.href = "savescore.html";
}

