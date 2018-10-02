/*jslint devel: true */
//var BaseURL = "https://boiling-savannah-49065.herokuapp.com/api/v1";
var BaseURL = "http://127.0.0.1:5000/api/v1";

function validateEmail(email) {
    "use strict";
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateUsername(username) {
    "use strict";
    var re = /^[a-zA-Z0-9]+$/;
    return re.test(String(username));
}

function validatePassword(password) {
    "use strict";
    return password.length > 6;
}

function startLoader(loader, formToDisable) {
    loader.style.display = "block";
    formToDisable.style.display = "none";
}

function stopLoader(loader, formToDisable) {
    loader.style.display = "none";
    formToDisable.style.display = "block";
}

function validateQuestion(text) {
    "use strict";
    var re = /.*[a-zA-Z0-9]+.*/;
    return re.test(String(text));
}
