'use strict';

let $ = function(id) {
    return document.getElementById(id);
}

let qualify = function(income) {
    let grossIncome = parseFloat(income);
    if (grossIncome >= 45000) {
        $('prequalifyForm').className = 'hide';
        $('formData').className = 'hide';
        $('approved').className = 'show';
        $('backButton').className = 'show';
    } else {
        $('prequalifyForm').className = 'hide';
        $('formData').className = 'hide';
        $('denied').className = 'show';
        $('backButton').className = 'show';
    }
}

let validateForm = function() {
    let isValid = true;

    let tableData = '';
    let required = 'This field is required.';

    let validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let email1 = $('email1').value;
    let email2 = $('email2').value;
    let firstName = $('firstName').value;
    let lastName = $('lastName').value;
    let city = $('city').value
    let state = $('state').value;
    let zip = $('zip').value;
    let income = $('income').value;
    let ssn = $('ssn').value;
    let terms = $('terms').checked;

    if (email1 == '') {
        email1 = required;
        isValid = false;
    } else if (validEmail.test(email1) == false) {
        email1 = 'Enter a valid email address';
        isValid = false;
    }

    if (email2 == '') {
        email2 = required;
        isValid = false;
    } else if (validEmail.test(email2) == false) {
        email2 = 'Enter a valid email address';
        isValid = false;
    } else if (!validEmail.test(email1) && validEmail.test(email2)) {
        email2 = email2;
        isValid = false;
    } else if (email2 != email1) {
        email2 = 'This entry must equal the first entry.';
        isValid = false;
    }

    if (firstName == '') {
        firstName = required;
        isValid = false;
    }

    if (lastName == '') {
        lastName = required;
        isValid = false;
    }

    if (city == '') {
        city = required;
        isValid = false;
    }

    if (state == 'select') {
        state = required;
        isValid = false;
    }

    if (zip == '') {
        zip = required;
        isValid = false;
    }

    if (income == '') {
        income = required;
        isValid = false;
    }

    if (ssn == '') {
        ssn = required;
        isValid = false;
    }

    if (!terms) {
        terms = required;
        isValid = false;
    } else {
        terms = 'Accepted';
    }

    if (!isValid) {
        tableData += '<tr><td>Email Address:</td><td>' + email1 + '</td></tr>';
        tableData += '<tr><td>Re-Enter Email Address:</td><td>' + email2 + '</td></tr>';
        tableData += '<tr><td>First Name:</td><td>' + firstName + '</td></tr>';
        tableData += '<tr><td>Last Name:</td><td>' + lastName + '</td></tr>';
        tableData += '<tr><td>City:</td><td>' + city + '</td></tr>';
        tableData += '<tr><td>State:</td><td>' + state + '</td></tr>';
        tableData += '<tr><td>Zip Code:</td><td>' + zip + '</td></tr>';
        tableData += '<tr><td>Gross Income:</td><td>' + income + '</td></tr>';
        tableData += '<tr><td>Last 4 of SSN:</td><td>' + ssn + '</td></tr>';
        tableData += '<tr><td>Terms:</td><td>' + terms + '</td></tr>';
        $('formData').innerHTML = tableData;
    } else {
        $('formData').innerHTML = '';
    }

    if (isValid) {
        qualify(income);
        $('prequalifyForm').submit();
    }
}

let resetForm = function() {
    $('prequalifyForm').className = 'show';
    $('formData').className = 'show';
    $('approved').className = 'hide';
    $('denied').className = 'hide';
    $('backButton').className = 'hide';
    $('email1').value = '';
    $('email2').value = '';
    $('firstName').value = '';
    $('lastName').value = '';
    $('city').value = '';
    $('state').value = 'select';
    $('zip').value = '';
    $('income').value = '';
    $('ssn').value = '';
    let terms = $('terms');
    terms.checked = false;
    $('formData').innerHTML = '';
    $('email1').focus();
}

let init = function() {
    $('submit').onclick = validateForm;
    $('reset').onclick = resetForm;
    $('backButton').onclick = resetForm;
    let input = $('prequalifyForm');
    if (addEventListener) {
        input.addEventListener('keyup', function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                $('submit').click();
            }
        })
    } else {
        input.attachEvent('keyup', function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                $('submit').click();
            }
        })
    }
}

if (window.addEventListener) {
    window.addEventListener('load', init, false);
} else {
    window.attachEvent('onload', init);
}