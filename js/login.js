'use strict';
const $ = function(id) {
    return document.getElementById(id);
}

let login = function() {
    let isValid = true;
    let email = $('email').value;
    let password = $('password').value;
    let key = (localStorage.getItem("\"" + email + "\"") !== null) ? localStorage.getItem("\"" + email + "\"") : null;
    let user = (JSON.parse(key) !== null) ? JSON.parse(key) : null;

    if (key === null || user === null) {
        $('error').firstChild.nodeValue = 'Invalid email or password';
        $('error').className = 'show, error';
        isValid = false;
        return;
    } else if (password !== user.password) {
        $('error').firstChild.nodeValue = 'Invalid email or password';
        $('error').className = 'show, error';
        isValid = false;
        return;
    } 
    if (isValid) {
        console.log('Login successful');
        $('error').className = 'hide';
        $('error').firstChild.nodeValue = '';
        $('btn-login-a').href = 'myaccount.html';
    }
}

let init = function() {
    $('btn-login').onclick = login;
}

if (addEventListener) {
    window.addEventListener('load', init, false);
} else {
    window.attachEvent('onload', init);
}