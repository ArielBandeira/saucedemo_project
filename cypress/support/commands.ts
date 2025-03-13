// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
/// <reference types="../support" />

import {HomePage} from "./pageObjects/HomePage";
import {CartPage} from "./pageObjects/CartPage";
import {CheckoutStepOnePage} from "./pageObjects/CheckoutStepOnePage";

Cypress.Commands.add('loginUiValidUser', () => {
    let validUsername: string, validPassword: string;
    cy.visit('https://www.saucedemo.com/v1/');
    cy.fixture('users.json').then((data) => {
        validUsername = data.validUser.username;
        validPassword = data.validUser.password;

        cy.get('[data-test="username"]').type(validUsername);
        cy.get('[data-test="password"]').type(validPassword);
    });
    cy.get('[type="submit"]').click();
    cy.url().should('include', '/inventory.html');
});

Cypress.Commands.add('goToCheckoutPageTwoWithItems', (qtd: number) => {
    const homePage = new HomePage();
    const cartPage = new CartPage();
    const checkoutStepTwoPage = new CheckoutStepOnePage();
    let firstName: string, lastName: string, postalCode: string;

    for (let i = 0; i < qtd; i++) {
        homePage.addFirstItemToCart();
    }

    homePage.goToCartPage();
    cartPage.clickCheckout();
    cy.fixture('users.json').then((data) => {
        firstName = data.validUser.firstName;
        lastName = data.validUser.lastName;
        postalCode = data.validUser.postalCode;
        checkoutStepTwoPage.fillCheckoutForm(firstName, lastName, postalCode);
    });
    checkoutStepTwoPage.clickContinueButton();
});