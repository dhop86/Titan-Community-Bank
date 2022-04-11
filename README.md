# Titan-Community-Bank

Titan Community Bank is a ficticious bank.
This is a project for my Client-Side JavaScript class.
Each week of the class is teaching new JavaScript concepts,
and each week those concepts are being put into use by creating new
webpages that utilize those concepts.

---

## Table of Contents

1. Index.html
2. Common folder
..1 prequalify.html
..2 registration.html
..3 login.html
..4 myaccount.html
..5 resetpassword.html
3. JS folder
..1 rotator.js
..2 prequalify.js
..3 registration.js
..4 login.js
..5 resetpassword.js
4. CSS folder
..1 tbc.css
5. IMG folder
..1 favicon.png
..2 benjamins.jpg
..3 creditcards.jpg
..4 dollarbill.jpg
..5 growmoney.jpg

---

## Index.html
The index page utilizes the rotator.js file & the images: benjamins.jpg, creditcards.jpg, dollarbills.jpg, and growmoney.jpg.
These rotator randomly selects one of the images to display on the index page each time the page is loaded.
The index page links to the prequalify.html, registration.html, and login.html pages.

## Common folder // prequalify.html
This page is used to prequalify a customer for a loan using an html form. The page uses the registration.js file to validate input
from the user & to determine if the user meets the qualification threshold for a loan.

## Common folder // registration.html
This page allows a user to create an account. The page uses a form to capture registration data. The registration.js file is used
to validate user input and "create an account" (store the user's credentials to the browser's local storage).

## Common folder // login.html
This page allows a user to login using the credentials created from the registration.html page. The login.js file is used to
validate form input, and check local storage for the login credentials.

## Common folder // resetpassword.html
This page allows a user to reset their password. The resetpassword.js file is used to validate form input, to check local storage
for the login credentials, and update the password stored in local storage.

## Common folder // myaccount.html
This page does not contain any content at the moment. In the future, the page will add a link to the nav element that directs a
user to a page where they can check their spending trends.

## JS folder // rotator.js
This file randomly selects from the images in the IMG folder, and uses the selected image in an add banner on the index page.

## JS folder // prequalify.js
Is used on prequalify.html to perform input validation and determine if the user's income meets the threshold for loan approval.

## JS folder // registration.js
Used to create an account. Form input validation is performed to make sure that both the password and confirm password fields
match. If valid, a new user object is created using the email address & password provided. The user object is converted to a string
using the JSON.stringfy method, then stored to the browser's local storage with the email address as the key, and both the email
and password as the value. This is done so that the login.js and resetpassword.js files can access the stored object by email address.

## JS folder // login.js
Used by login.html to validate user form input and check local storage for a matching key,value user object. If valid, the user is
redirected to the myaccount.html page.

## JS folder // resetpassword.js
User on the resetpassword.html page to validate form input. The program checks that the current password & new password fields to not match.
If so, local storage is checked using the email address as the key. If a matching user object exists in local storage, and if the current
password matches, the user object is removed from local storage and a new user object with email as key, and email & new password as value
is stored in local storage.