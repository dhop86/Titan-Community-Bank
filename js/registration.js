'use strict';
const $ = function(id) {
    return document.getElementById(id);
}

class UserProfile {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    } 
}

let validateRegistration = function() {
    let isValid = true;
    let required = 'Required';
    let noMatch = 'Must match first entry';

    let email = $('email').value;
    let password1 = $('password1').value;
    let password2 = $('password2').value;

    if (email === '') {
        email = required;
        isValid = false;  
    }

    if (password1 === '') {
        password1 = required;
        isValid = false;
    }

    if (password2 === '') {
        password2 = required;
        isValid = false;
    } else if (password1 === required && password2 !== '') {
        isValid = false;
    } else if (password1 !== '' && password2 !== password1) {
        password2 = noMatch;
        isValid = false;
    }

    if (isValid) {
        $('register-a').href = 'login.html';
        let User = new UserProfile(email, password1);
        window.localStorage.setItem(User.email, JSON.stringify(User));
    } else {
        addErrorMessages(email, password1, password2, required, noMatch);
    }
}

let addErrorMessages = function(email, password1, password2, required, noMatch) {
    let errorTableData = '';
    if (email === required) {
        errorTableData += '<tr><td>Email: </td><td class="error">' + email + '</td></tr>';
    } else {
        errorTableData += '<tr><td>Email: </td><td>' + email + '</td></tr>';
    }
    if (password1 === required) {
        errorTableData += '<tr><td>Password: </td><td class="error">' + password1 + '</td></tr>';
    } else {
        errorTableData += '<tr><td>Password: </td><td>' + password1 + '</td></tr>';
    }
    if (password2 === required || password2 === noMatch) {
        errorTableData += '<tr><td>Confirm Password: </td><td class="error">' + password2 + '</td></tr>';
    } else {
        errorTableData += '<tr><td>Confirm Password: </td><td>' + password2 + '</td></tr>';
    }
    let table = $('errorTable');
    if (!table) {
        table = document.createElement('table');
        table.id = 'errorTable';
        table.className = 'show';
        $('registerForm').parentElement.appendChild(table);
    }
    table.innerHTML = errorTableData;
}

let init = function() {
    $('btn-register').onclick = validateRegistration;
}

if (addEventListener) {
    window.addEventListener('load', init, false);
} else {
    window.attachEvent('onload', init);
}