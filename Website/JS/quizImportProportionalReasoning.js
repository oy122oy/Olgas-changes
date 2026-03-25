function fetchJson() {
  fetch("../JSON/Quiz/ProportionalReasoning.json")
    .then((response) => response.json())
    .then((json) => processJson(json));
}

function processJson(json) {
  let html = "";
  let questionNo = 1;

  json.courses.forEach((object) => {
    let htmlChunk = `
                        <div class="questionDiv">
                            <h3 class="questionHeader">
                                Question ${questionNo}
                            </h3>
                            <h4 class="questionMain">
                                ${object.Question}
                            </h4>
                            <input class="questionTextInput" type="text">
                            <li></li>
                        </div>
            `;
    questionNo = questionNo + 1;
    html = html + htmlChunk;
  });

  document.getElementById("quizContainer").innerHTML = html;
}

fetchJson();
