'use strict';

let $ = function(id) {
    return document.getElementById(id);
}

class Transaction {
    constructor(date, description, type, amount) {
        this.date = date;
        this.description = description;
        this.type = type;
        this.amount = parseFloat(amount);
    };
    createTableRow = function() {
        let row = document.createElement('tr');
        let month = this.date.getMonth() + 1;
        let day = this.date.getDate();
        let year = this.date.getFullYear();
        row.innerHTML = '<td>' + month + '/' + day + '/' + year
            + '</td><td>' + this.description
            + '</td><td>' + this.type 
            + '</td><td>' + '$' + this.amount.toFixed(2) + '</td>';
        $('transactions').appendChild(row);
    };
    calcBalance = function() {
        let balance;
        balance = checkBalance();
        if (this.type === 'Credit') {
            balance += this.amount;
        }
        if (this.type === 'Debit') {
            balance -= this.amount;
        }
        window.localStorage.removeItem('balance');
        window.localStorage.setItem('balance', balance.toFixed(2));
        $('balance').innerHTML = 'Balance: $' + balance.toFixed(2);
    };
}

let createTransaction = function(data) {
    for (let i = 0; i < data.length; i++) {
        let transaction = data[i];
        transaction = new Transaction(transaction[0], transaction[1], transaction[2], transaction[3]);
        transaction.calcBalance();
        transaction.createTableRow();
    }
}

let checkBalance = function() {
    let balance;
    if (!isNaN(localStorage.getItem('balance')) && localStorage.getItem('balance') !== null) {
        balance = parseFloat(localStorage.getItem('balance'))
    } else {
        balance = 0;
    }
    return balance;
}

let withdrawFunds = function() {
    if ($('depositAmount').className = 'show') {
        $('depositAmount').className = 'hide';
    }
    let confirm = $('confirm-deposit-btn');
    if (confirm) {
        confirm.setAttribute('id', 'confirm-withdraw-btn');
    } else {
        $('confirm-btn').setAttribute('id', 'confirm-withdraw-btn');
    }
    $('withdrawAmount').className = 'show';
    $('confirm-withdraw-btn').className = 'show';
    $('confirm-withdraw-btn').onclick = function() {
        let balance = checkBalance();
        let currency = /^\d+(\.\d{1,2})?$/;
        let amount = $('withdrawAmount').value;
        let isValid = true;
        if (!currency.test(amount)) {
            $('inputError').innerHTML = 'Enter a valid amount. No special characters.';
            $('inputError').className = 'show, error';
            isValid = false;
        }
        if (amount > balance) {
            $('inputError').innerHTML = 'Insufficient Funds';
            $('inputError').className = 'show, error';
            isValid = false;
        }
        if (isValid) {
            let today = new Date();
            let withdraw = [
                [today, 'Withdrawal', 'Debit', amount]
            ];
            createTransaction(withdraw);
            $('confirm-withdraw-btn').setAttribute('id', 'confirm-btn');
            reset();
        } 
    }
}

let depositFunds = function() {
    if ($('withdrawAmount').className = 'show') {
        $('withdrawAmount').className = 'hide';
    }
    let confirm = $('confirm-withdraw-btn');
    if (confirm) {
        confirm.setAttribute('id', 'confirm-deposit-btn');
    } else {
        $('confirm-btn').setAttribute('id', 'confirm-deposit-btn');
    }
    $('depositAmount').className = 'show';
    $('confirm-deposit-btn').className = 'show';
    $('confirm-deposit-btn').onclick = function() {
        let currency = /^\d+(\.\d{1,2})?$/;
        let isValid = true;
        let amount = $('depositAmount').value;
        if (!currency.test(amount)) {
            $('inputError').innerHTML = 'Enter a valid amount. No special characters.';
            $('inputError').className = 'show, error';
            isValid = false;
        }
        if (isValid) {
            let today = new Date();
            let withdraw = [
                [today, 'Deposit', 'Credit', amount]
            ];
            createTransaction(withdraw);
            $('confirm-deposit-btn').setAttribute('id', 'confirm-btn');
            reset();
        }
    }
}

let reset = function() {
    $('withdrawAmount').value = '';
    $('withdrawAmount').className = 'hide';
    $('depositAmount').value = '';
    $('depositAmount').className = 'hide';
    $('confirm-btn').className = 'hide';
    $('inputError').innerHTML = '';
    $('inputError').className = 'hide';
}

let clearStorage = function() {
    window.localStorage.removeItem('balance');
}

let init = function() {
    let data = [
        [new Date('February 4, 2022'), 'Thinh Ahn', 'Debit', 31.98,],
        [new Date('February 7, 2022'), 'Amazon Refund', 'Credit', 12.99,],
        [new Date('February 16, 2022'), 'Harness', 'Credit', 3155.00,],
        [new Date('February 17, 2022'), 'Trenam', 'Credit', 1864.00,],
        [new Date('February 17, 2022'), 'SPC', 'Debit', 385.00,],
        [new Date('February 23, 2022'), 'Moe\'s', 'Debit', 19.97,],
        [new Date('March 1, 2022'), 'Suncoast Credit Union', 'Debit', 925.00,],
        [new Date('March 3, 2022'), 'Amazon', 'Debit', 37.46,],
        [new Date('March 14, 2022'), 'Trenam', 'Credit', 1864.00,],
        [new Date('March 17, 2022'), 'Amazon Refund', 'Credit', 37.46,],
    ];
    createTransaction(data);
}

if (addEventListener) {
    window.addEventListener('load', init, false);
    $('withdraw-btn').addEventListener('click', withdrawFunds, false);
    $('deposit-btn').addEventListener('click', depositFunds, false);
    window.addEventListener('beforeunload', clearStorage, false);
} else {
    window.attachEvent('onload', init);
    $('withdraw').attachEvent('onclick', withdrawFunds);
    $('deposit').attachEvent('onclick', depositFunds);
    window.attachEvent('onbeforeunload', clearStorage);
}