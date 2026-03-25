
 

var score = 0;
var answered = [];

var questions = [
  {
    q: "What is 15 to the power of 4?",
    options: ["50,525", "50,625", "51,625", "45,000"],
    correct: 1,
  },
  {
    q: "Calculate 15 × 15 × 15 × 15:",
    options: ["30,625", "50,625", "50,825", "50,615"],
    correct: 1,
  },
  {
    q: "Evaluate the expression: 15⁴",
    options: ["60,000", "225,000", "50,625", "3,375"],
    correct: 2,
  },
  {
    q: "Solve: x = 15 × 15 × 15 × 15",
    options: ["x = 5,625", "x = 50,625", "x = 50,652", "x = 5,062"],
    correct: 1,
  },
  {
    q: "What is the product of 225 and 225?",
    options: ["40,000", "50,225", "50,625", "51,625"],
    correct: 2,
  },
  {
    q: "What is the value of 15⁴?",
    options: ["50,555", "50,600", "50,625", "50,650"],
    correct: 2,
  },
  {
    q: "Find the result: 15 to the 4th power",
    options: ["50,620", "50,625", "50,630", "50,615"],
    correct: 1,
  },
  {
    q: "If y = 15⁴, what is y?",
    options: ["50,625", "3,375", "225", "50,655"],
    correct: 0,
  },
  {
    q: "Multiply 15 by itself four times:",
    options: ["15,000", "30,625", "50,625", "60,000"],
    correct: 2,
  },
  {
    q: "What is the square of 225?",
    options: ["45,625", "50,625", "55,625", "50,225"],
    correct: 1,
  },
  {
    q: "Determine the value: 15 × 15 × 225",
    options: ["45,000", "50,525", "50,625", "50,725"],
    correct: 2,
  },
  {
    q: "Simplify the exponent: 15⁴",
    options: ["3,375", "50,625", "5,062", "15,151"],
    correct: 1,
  },
  {
    q: "What does 15 to the power of 4 equal?",
    options: ["50,625", "50,635", "50,645", "50,655"],
    correct: 0,
  },
  {
    q: "Calculate the 4th power of 15:",
    options: ["50,605", "50,615", "50,625", "50,635"],
    correct: 2,
  },
  {
    q: "What is (15²)²?",
    options: ["450", "50,625", "50,525", "3,375"],
    correct: 1,
  },
  {
    q: "Compute: 15 × 3,375",
    options: ["50,625", "50,225", "51,625", "49,625"],
    correct: 0,
  },
  {
    q: "Find the value: 15 * 15 * 15 * 15",
    options: ["50,600", "50,610", "50,625", "50,630"],
    correct: 2,
  },
  {
    q: "What is 15⁴ written in standard form?",
    options: ["15,151", "30,625", "50,625", "60,000"],
    correct: 2,
  },
  {
    q: "Solve for the exponent: 15 to the 4th",
    options: ["50,550", "50,575", "50,600", "50,625"],
    correct: 3,
  },
  {
    q: "What is 15 multiplied by itself 4 times?",
    options: ["225", "3,375", "50,625", "50,600"],
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
 
  let quizName = "Solving Equations Quiz";

  // saving on local storage for json to read it
  localStorage.setItem("currentQuizScore",        score);         
  localStorage.setItem("currentTotalQuestions",   questions.length); // total questions
  localStorage.setItem("currentQuizName",         quizName);

  // going to sacescore page   
  window.location.href = "savescore.html";
}

