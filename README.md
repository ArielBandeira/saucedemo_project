

## Project Overview
Project challenge for the QA Engineer position at Fortics.
This project contains end-to-end automation for a demo website named Sauce Demo (from [SwagLabs](https://saucelabs.com/)).
This project uses Cypress with TypeScript and the Page Object Model (POM) design pattern.

### Sauce Demo
<img src="https://live.staticflickr.com/65535/54382050807_37d33ad71d_h.jpg" width="400"  alt="sauce demo item list"/>


## ✅ Installation & Setup
Installing Cypress, instructions from the official docs -> https://docs.cypress.io/app/get-started/install-cypress
Using NPM

`npm install cypress --save-dev`

## ✅ Folder Structure

```
├───cypress
│   ├───e2e
│   │   └───tests
│   ├───fixtures
│   ├───screenshots
│   └───support
│       ├───pageObjects
│       └───utils
```

## ✅ Running Tests

Open test runner

`npx cypress run`

Run specific test

`npx cypress run --spec cypress/e2e/tests/login.spec.ts`

## Test Reports

Open test run results in folder `cypress/reports`

<img src="https://live.staticflickr.com/65535/54387800685_933d7a41dd_z.jpg" width="400"  alt="sauce demo item list"/>

## ✅ Functional Test Cases

### Login Page
- Verify that user is able to login with the correct username and correct password
- Verify that user is NOT able to login with invalid password
- Verify that user is NOT able to login with invalid username
- Verify that user is NOT able to login with empty username and password

### Home Page
- Verify that user is able to add product to cart
- Verify that user is able to go to Item Details page from the Home Page
- Verify that user is able to remove product from cart on the Home page
- Verify that user is able to sort items alphabetically
- Verify that user is able to logout

### Item Details Page
- Verify that user is able to go to Cart Page from the Details Page
- Verify that user is able to go back to Home Page from the Details Page
- Verify that user is able to see the correct item details
- Verify that user is able to add item to cart from the Details page
- Verify that user is able to remove item from cart from the Details page
- Verify that user is able to add item to cart from the Details page and see item on Cart Page

### Cart Page
- Verify that user is able to add product to cart
- Verify that added items appear in the cart
- Verify that user can remove an item from cart
- Verify that cart is empty if no product is added
- Verify that Continue Shopping button redirects to Home page
- Verify that Checkout button redirects to Checkout page

### Checkout Page Step One
- Verify that user is able to fill form and continue
- Verify that user is not able to send an empty form
- Verify that user is not able to send form with empty last name
- Verify that user is not able to send form with empty zip code


### Checkout Page Step Two
- Verify that user is able to see correct Cart Information in Checkout Step Two Page
- Verify that user is able to see correct Payment and Shipping Information in Checkout Step Two Page
- Verify that user is able to see correct Total amount (items + tax) calculation in Checkout Step Two Page
- Verify that user is able to finish the purchase in the Checkout page
- Verify that user is able to cancel the purchase in the Checkout page

## 💡 Future Improvements
- Add visual testing
- Implement Test Data Management
- Add API testing
- Add test tagging and filtering (@smoke, @regression)
- Create common assertion logic into helper or utility files for better maintainability
- Integrate with a CI/CD
- Add Cypress’s testRetries or wrap critical steps in retry mechanisms to reduce noise from flaky failures
- Add logger for error message and warns
- Generate Reports (mochawesome or allure-reporter)


## 📬 Contact

If you have questions or suggestions, feel free to reach out.

> - **Author**: Ariel Bandeira
>
> - **Email**: arielbandeira47@gmail.com
>
> - **LinkedIn**: [linkedin.com/in/arielbandeira](https://www.linkedin.com/in/arielbandeira/)


## 📢 Final Notes
This project is a work in progress. Improvements and feedback are always appreciated. Happy Testing! 🚀
