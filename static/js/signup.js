function signup(username, email, password) {
    "use strict";
    fetch(BaseURL + "/auth/signup", {
        method: "POST",
        headers: {
            "Accept": "application/json, *//*",
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
            username: username,
            password: password,
            email: email
        })
    })
        .then(function(response) {
            console.log(response.status);
            switch (response.status) {
                case 201:
                    document.getElementById("loader").style.display = "none";
                    window.open("login.html", "_self");
                    break;
                case 409:
                    document.getElementById("loader").style.display = "none";
                    document.getElementById("form-div-id").style.display = "block";
                    var confirmErrorMessage = document.getElementById("confirm_password_input_error");
                    confirmErrorMessage.style.color = "red";
                    confirmErrorMessage.style.fontWeight = "bold";
                    confirmErrorMessage.style.fontSize = "16px";
                    confirmErrorMessage.innerText = "User already exists. Login to proceed";
                    break;
                default:
                    stopLoader(document.getElementById("loader"), document.getElementById("form-div-id"));
                    document.getElementById("confirm_password_input_error").innerText = "Sign up failed. Try again later";
            }
        })
        .catch(function (error) {
            console.log(error);
            document.getElementById("loader").style.display = "none";
            document.getElementById("form-div-id").style.display = "block";
            document.getElementById("confirm_password_input_error").innerText = "Something went wrong. Try again";
        })
}

document.getElementById("form-div-id").addEventListener("submit", function (e) {
    "use strict";
    e.preventDefault();

    startLoader(document.getElementById("loader"), document.getElementById("form-div-id"));

    var username = document.getElementById("username").value,
        email = document.getElementById("email").value,
        password = document.getElementById("password").value,
        confirmPassword = document.getElementById("confirm_password").value,
        usernameError = document.getElementById("username_input_error"),
        emailError = document.getElementById("email_input_error"),
        passwordError = document.getElementById("password_input_error"),
        confirmPasswordError = document.getElementById("confirm_password_input_error");
    usernameError.innerText = "";
    emailError.innerText = "";
    passwordError.innerText = "";
    confirmPasswordError.innerText = "";

    if (!validateUsername(username)) {
        stopLoader(document.getElementById("loader"), document.getElementById("form-div-id"));
        usernameError.innerText = "Username is not valid";
        document.getElementById("username").style.color = "#ff0000";
        return;
    }

    if (!validateEmail(email)) {
        stopLoader(document.getElementById("loader"), document.getElementById("form-div-id"));
        emailError.innerText = "Email is not valid";
        document.getElementById("email").style.color = "#ff0000";
        return;
    }

    if (!validatePassword(password)) {
        stopLoader(document.getElementById("loader"), document.getElementById("form-div-id"));
        passwordError.innerText = "Password must be more than 6 characters long";
        document.getElementById("password").style.color = "#ff0000";
        return;
    }

    if (password !== confirmPassword) {
        stopLoader(document.getElementById("loader"), document.getElementById("form-div-id"));
        confirmPasswordError.innerText = "Passwords do not match";
        document.getElementById("password").style.color = "#ff0000";
        document.getElementById("confirm_password").style.color = "#ff0000";
        return;
    }

    signup(username, email, password)
});