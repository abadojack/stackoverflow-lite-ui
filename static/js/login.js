/*jslint devel: true */

function login(username, password) {
    "use strict";
    fetch(BaseURL + "/auth/login", {
        method: "POST",
        headers: {
            "Accept": "application/json, *//*",
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then(function(response) {
            switch (response.status) {
                case 404:
                    stopLoader(document.getElementById("loader"), document.getElementById("form-div-id"));
                    var loginFailedError = document.getElementById("login_failed_error");
                    loginFailedError.innerText = "User not found. Create an account to proceed";
                    break;
                case 422:
                    stopLoader(document.getElementById("loader"), document.getElementById("form-div-id"));
                    loginFailedError = document.getElementById("login_failed_error");
                    loginFailedError.innerText = "Invalid username/password";
                    break;
                case 200:
                    document.getElementById("loader").style.display = "none";
                    response.json().then(function(data) {
                        window.localStorage.setItem("stackoverflow-lite-token", data.token);
                        window.location.replace("home.html");
                    });

                    break;
                default:
                    document.getElementById("loader").style.display = "none";
                    document.getElementById("form-div-id").style.display = "block";
                    document.getElementById("login_failed_error").innerText = "Login failed. Try again";
            }
        })
        .catch(function (error) {
            console.log(error);
            document.getElementById("loader").style.display = "none";
            document.getElementById("form-div-id").style.display = "block";
            document.getElementById("login_failed_error").innerText = "Something went wrong. Try again";
        })
}

document.getElementById("form-div-id").addEventListener("submit", function (e) {
    "use strict";
    e.preventDefault();

    startLoader(document.getElementById("loader"), document.getElementById("form-div-id"));

    var username = document.getElementById("username").value,
        password = document.getElementById("password").value;

    login(username, password)
});