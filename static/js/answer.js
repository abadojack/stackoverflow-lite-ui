/*jslint devel: true */
window.onload = function () {
    getQuestion();
};

const questionID = window.localStorage.getItem("question_id");

function getQuestion() {
    "use strict";
    fetch(BaseURL + "/questions/" + questionID , {
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
                    response.json().then(data => {
                        makeQuestion(data.question);
                        for(var i = 0; i < data.question.answers.length; i++) {
                            makeAnswer(data.question.answers[i]);
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

function makeQuestion(question) {
    var questionDiv = document.getElementById("div-question");
    var  content = document.createElement("div");
    content.classList.add("content");
    questionDiv.appendChild(content);

    content.innerHTML = `
            <div class="card">
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
                        <td class="question-body">${question.body}</td>
                    </tr>
                    <tr>
                      <td></td>
                        <td align="right">
                            <button align="right" type="button" onclick="alert("Edit!")" class="button-white"><i class="fas fa-edit"></i> Edit</button>
                            <button align="right" type="button" onclick="alert("Delete!")" class="button-white"><i class="fa fa-trash" aria-hidden="true"></i> Delete</button>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    `;
}

function makeAnswer(answer) {
    var answerDiv = document.getElementById("answers-div");
    var  content = document.createElement("div");
    content.classList.add("content-answer");
    answerDiv.appendChild(content);

    content.innerHTML = `
            <div class="card">
                <div class="card-container">
                    <table style="width:100%">
                        <tr>
                            <td class="username-answer">${answer.user}</td>
                            <td class="time" align="right">${answer.time_created}</td>
                        </tr>
                        <tr>
                            <td class="answer-body">${answer.body}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td align="right">
                              <button align="right" type="button" onclick="confirm("edit")" class="button-white"><i class="fas fa-edit"></i> Edit</button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
    `;
}

document.getElementById("form-post").addEventListener("submit", function (e) {
    "use strict";
    e.preventDefault();

    console.log("clicked");
    var body = document.getElementById("answer-body").value;

    if(!validateQuestion(body)) {
        document.getElementById("answer-body").setCustomValidity("Please enter a valid question body.");
        return;
    }

    postAnswer(body);
});

function postAnswer(body) {
    "use strict";
    fetch(BaseURL + "/questions/" + questionID + "/answers", {
        method: "POST",
        headers: {
            "Accept": "application/json, *//*",
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "token": window.localStorage.getItem("stackoverflow-lite-token")
        },
        body: JSON.stringify({"body": body})
    })
        .then(function(response) {
            switch (response.status) {
                case 201:
                    document.getElementById("answer-body").value = "";
                    location.reload();
                    break;
                default:
                    console.log(response);
            }
        })
        .catch(function (error) {
            console.log(error);
        })
}
