'use strict';
const $ = function(id) {
    return document.getElementById(id);
}

let resetForm = function() {
    $('emailError').firstChild.nodeValue = '';
    $('emailError').className = 'hide';
    $('password1Error').firstChild.nodeValue = '';
    $('password1Error').className = 'hide';
    $('password2Error').firstChild.nodeValue = '';
    $('password2Error').className = 'hide';
    $('email').focus();
}

let resetPassword = function() {
    let isValid = true;
    let email = $('email').value;
    let password1 = $('password1').value;
    let password2 = $('password2').value;

    let key = (localStorage.getItem("\"" + email + "\"") !== null) ? localStorage.getItem("\"" + email + "\"") : null;
    let user = (JSON.parse(key) !== null) ? JSON.parse(key) : null;

    if (email === '') {
        $('emailError').firstChild.nodeValue = 'Required';
        $('emailError').className = 'show, error';
        isValid = false;
    } else {
        $('emailError').firstChild.nodeValue = '';
        $('emailError').className = 'hide';
    }

    if (password1 === '') {
        $('password1Error').firstChild.nodeValue = 'Required';
        $('password1Error').className = 'show, error';
        isValid = false
    } else {
        $('password1Error').firstChild.nodeValue = '';
        $('password1Error').className = 'hide';
    }

    if (password2 === '') {
        $('password2Error').firstChild.nodeValue = 'Required';
        $('password2Error').className = 'show, error';
        isValid = false;
    } else if ((password1 !== '' && password2 === password1) ||
        (key == null && password2 === password1)) {
        $('password2Error').firstChild.nodeValue = 'Must not match first entry';
        $('password2Error').className = 'show, error';
        isValid = false;
    } else {
        $('password2Error').firstChild.nodeValue = '';
        $('password2Error').className = 'hide';
    }

    if ((email !== '' && password1 !== '' && password2 !== '')
        && (user === null || email !== user.email || password1 !== user.password)
        && (password1 !== password2)) {
        $('emailError').firstChild.nodeValue = 'Invalid email or password';
        $('emailError').className = 'show, error';
        return;
    }

    if (isValid) {
        resetForm();
        window.localStorage.removeItem("\"" + email + "\"");
        user.password = password2;
        window.localStorage.setItem(JSON.stringify(user.email), JSON.stringify(user));
        $('btn-resetPw-a').href = 'login.html';
    }
}

let init = function() {
    $('btn-resetPw').onclick = resetPassword;
}

if (addEventListener) {
    window.addEventListener('load', init, false);
    window.addEventListener('load', resetForm, false);
} else {
    window.attachEvent('onload', init);
    window.attachEvent('onload', resetForm);
}