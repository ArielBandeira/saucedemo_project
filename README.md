

## ✅ Project Overview
This is the project for the QA Engineer position at Fortics.

## ✅ Installation & Setup
Installing Cypress, instructions from the official docs -> https://docs.cypress.io/app/get-started/install-cypress
Using NPM

`npm install cypress --save-dev`

## ✅ Folder Structure

```
└───cypress
    ├───e2e
    │   ├───1-getting-started
    │   ├───2-advanced-examples
    │   └───tests
    ├───fixtures
    └───support
        └───pageObjects
```


## ✅ Running Tests

Open test runner

`npx cypress run`

Run specific test

`npx cypress run --spec cypress/e2e/tests/login.spec.ts`


## ✅ Functional Test Cases

### Login Page
####  [TC-A001] : Verify that user is able to login with the correct username and correct password
####  [TC-A001] : Verify that user is not able to login with incorrect username and correct password
####  [TC-A001] : Verify that user is not able to login with correct username and incorrect password
####  [TC-A001] : Verify that user is not able to login with empty field for username
####  [TC-A001] : Verify that user is not able to login with empty field for password

### Home Page
#### [TC-A001] : Verify that user is able to logout
#### [TC-A001] : Verify that user is able to add product to cart
#### [TC-A001] : Verify that user is able to remove product from cart on the Home page
#### [TC-A001] : Verify that user is able to open left side menu
#### [TC-A001] : Verify that user is able to got to About page from left side menu
#### [TC-A001] : Verify that user is able to sort items alphabetically ascending
#### [TC-A001] : Verify that user is able to sort items alphabetically descending
#### [TC-A001] : Verify that user is able to sort items by price from low to high
#### [TC-A001] : Verify that user is able to sort items by price from high to low

### Cart Page
#### [TC-A001] : Verify that user is able to remove product from cart on the Cart page
#### [TC-A001] : Verify that user is able to go back from the Cart page to Home page using Continue Shopping Button
#### [TC-A001] : Verify that user is able to go to Check page using Checkout button

### Checkout Page Step One
#### [TC-A001] : Verify that user is able to fill the Checkout page form
#### [TC-A001] : Verify that user is not able to continue without filling the First Name in the Checkout page form
#### [TC-A001] : Verify that user is not able to continue without filling the Last Name in the Checkout page form
#### [TC-A001] : Verify that user is not able to continue without filling the Zip/Postal Code in the Checkout page form

### Checkout Page Step Two
#### [TC-A001] : Verify that user is able to see the correct cart information in the Checkout page
#### [TC-A001] : Verify that user is able to finish the purchase in the Checkout page
#### [TC-A001] : Verify that user is able to cancel the purchase in the Checkout page



