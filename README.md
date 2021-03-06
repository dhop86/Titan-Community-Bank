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
  * prequalify.html
  * registration.html
  * login.html
  * myaccount.html
  * resetpassword.html
  * spendingtrends.html
3. JS folder
  * rotator.js
  * prequalify.js
  * registration.js
   * login.js
  * resetpassword.js
  * spending-graph.js
  * transactions.js
4. CSS folder
  * tbc.css
5. IMG folder
  * favicon.png
  * benjamins.jpg
  * creditcards.jpg
  * dollarbill.jpg
  * growmoney.jpg

---

## Index.html
The index page utilizes the rotator.js file & the images: benjamins.jpg, creditcards.jpg, dollarbills.jpg, and growmoney.jpg.
These rotator randomly selects one of the images to display on the index page each time the page is loaded.
The index page links to the prequalify.html, registration.html, and login.html pages.

---

## Common folder
### prequalify.html
This page is used to prequalify a customer for a loan using an html form. The page uses the registration.js file to validate input
from the user & to determine if the user meets the qualification threshold for a loan.

### registration.html
This page allows a user to create an account. The page uses a form to capture registration data. The registration.js file is used
to validate user input and "create an account" (store the user's credentials to the browser's local storage).

### login.html
This page allows a user to login using the credentials created from the registration.html page. The login.js file is used to
validate form input, and check local storage for the login credentials.

### resetpassword.html
This page allows a user to reset their password. The resetpassword.js file is used to validate form input, to check local storage
for the login credentials, and update the password stored in local storage.

### myaccount.html
This page is only available once logged in. The page displays the available balance, a table of recent transactions, and the options
to make deposits and withdrawals. The page uses the transactions.js file.

### spendingtrends.html
This page is accessible only from the myaccount page. A graph is generated by the associated spending-graph.js file.
The graph displays spending in various categories.

---

## JS folder
### rotator.js
This file randomly selects from the images in the IMG folder, and uses the selected image in an add banner on the index page.

### prequalify.js
Is used on prequalify.html to perform input validation and determine if the user's income meets the threshold for loan approval.

### registration.js
Used to create an account. Form input validation is performed to make sure that both the password and confirm password fields
match. If valid, a new user object is created using the email address & password provided. The user object is converted to a string
using the JSON.stringfy method, then stored to the browser's local storage with the email address as the key, and both the email
and password as the value. This is done so that the login.js and resetpassword.js files can access the stored object by email address.

### login.js
Used by login.html to validate user form input and check local storage for a matching key,value user object. If valid, the user is
redirected to the myaccount.html page.

### resetpassword.js
Used on the resetpassword.html page to validate form input. The program checks that the current password & new password fields to not match.
If so, local storage is checked using the email address as the key. If a matching user object exists in local storage, and if the current
password matches, the user object is removed from local storage and a new user object with email as key, and email & new password as value
is stored in local storage.

### spending-graph.js
Used on the spendingtrends.html page. This JS file creates an animated bar graph showing spending in various categories. The categories & amounts
are static, and stored in an object. The file adds DOM elements to the html page to create the graph, and uses a setInterval() timer to animate
the graph on page load.

### transactions.js
User on the myaccount.html page to calculate the available balance, populate a table with recent transactions, and allow users to make
deposits & withdrawals that adjust the available balance. The file houses a Transactions class which is used for each transaction. The balance
is stored in local storage to simulate a balance being stored on a server. However, the balance is removed from local storage on page refresh/close
so that the balance is not skewed my the transactions loading in again on a new page load.
