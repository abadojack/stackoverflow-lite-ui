/*jslint devel: true */
window.onload = function() {
    getQuestions();
};

document.getElementById("form-post").addEventListener("submit", function (e) {
    "use strict";
    e.preventDefault();
    var title = document.getElementById("question-title").value;
    var body = document.getElementById("question-body").value;

    if(!validateQuestion(title)) {
        document.getElementById("question-title").setCustomValidity("Please enter a valid question title.");
        return;
    }

    if(!validateQuestion(body)) {
        document.getElementById("question-body").setCustomValidity("Please enter a valid question body.");
        return;
    }

    postQuestion(title, body);
});

function postQuestion(title, body) {
    "use strict";
    fetch(BaseURL + "/questions", {
        method: "POST",
        headers: {
            "Accept": "application/json, *//*",
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "token": window.localStorage.getItem("stackoverflow-lite-token")
        },
        body: JSON.stringify({"body": body, "title":title})
    })
        .then(function(response) {
            switch (response.status) {
                case 201:
                    document.getElementById("question-title").value = "";
                    document.getElementById("question-body").value = "";
                    location.reload();
                    break;
                case 409:
                    alert("Question with the same title already exists.");
                    break;
                default:
                    console.log(response);
            }
        })
        .catch(function (error) {
            console.log(error);
        })
}

function getQuestions() {
    "use strict";
    fetch(BaseURL + "/questions", {
        method: "GET",
        headers: {
            "Accept": "application/json, *//*",
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "token": window.localStorage.getItem("stackoverflow-lite-token")
        }
    })
        .then(function(response) {
            switch (response.status) {
                case 200:
                    response.json().then(function(data) {
                        var questions = data.questions;
                        for (var i = 0; i < questions.length; i++) {
                            makeElement(questions[i]);
                        }
                    });
                    break;
                default:
                    console.log(response);
            }
        })
        .catch(function (error) {
            console.log(error);
        })
}

function makeElement(question) {
    var questionDiv = document.getElementById("div-question");
    var  content = document.createElement("div");
    content.classList.add("content");
    questionDiv.appendChild(content);

    var answersLen = question.answers.length;

    content.innerHTML = `
          <div class="card" onClick="openAnswers('${question.question_id}')">
            <div class="card-container">
              <table style="width:100%">
                <tr>
                  <td class="username">${question.user}</td>
                  <td align="right" class="time">${question.time_created}</td>
                </tr>
                <tr>
                  <td class="question-title">${question.title}</td>
                </tr>
                <tr>
                  <td class="answers">Answers: ${answersLen}</td>
                </tr>
              </table>
            </div>
          </div>
    `;
}

function openAnswers(questionID) {
    localStorage.setItem("question_id", questionID);
    window.location.href = "answers.html";
}
