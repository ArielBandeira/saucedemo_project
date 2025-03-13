import {CheckoutStepOnePage} from "../../support/pageObjects/CheckoutStepOnePage";
import {HomePage} from "../../support/pageObjects/HomePage";
import {CartPage} from "../../support/pageObjects/CartPage";
import {CheckoutStepTwoPage} from "../../support/pageObjects/CheckoutStepTwoPage";
import {Logger} from "../../support/utils/logger";


describe('Checkout Page Step One Tests', () => {
    const homePage = new HomePage();
    const cartPage = new CartPage();
    const checkoutStepOnePage= new CheckoutStepOnePage();
    const checkoutStepTwoPage = new CheckoutStepTwoPage();
    let firstName, lastName, postalCode;

    before(() => {
        cy.fixture('users.json').then((data) => {
            firstName = data.validUser.firstName;
            lastName = data.validUser.lastName;
            postalCode = data.validUser.postalCode;
        });
    })

    beforeEach(() => {
        cy.loginUiValidUser();
    });

    it('Verify that user is able to fill form and continue', () => {
        // Arrange
        // Add an item to cart and go to Checkout Page
        Logger.setup("Add an item to cart and go to Checkout Page");
        homePage.addFirstItemToCart();
        homePage.goToCartPage();
        cartPage.clickCheckout();

        // Act
        // Fill the form
        Logger.testStep("Fill the form");
        checkoutStepOnePage.fillFirstName(firstName);
        checkoutStepOnePage.fillLastName(lastName);
        checkoutStepOnePage.fillPostalCode(postalCode);
        checkoutStepOnePage.clickContinueButton();

        // Assert
        // Verify that user is able to go to Checkout Step Two Page
        Logger.testStep("Verify that user is able to go to Checkout Step Two Page");
        Logger.testStep("Verify that user is able to see summary area");
        cy.url().should('include', '/checkout-step-two.html');
        checkoutStepTwoPage.getSummaryArea().should('be.visible');

    });

    it('Verify that user is not able to send an empty form', () => {
        // Arrange
        // Add an item to cart and go to Checkout Page
        Logger.setup("Add an item to cart and go to Checkout Page");
        homePage.addFirstItemToCart();
        homePage.goToCartPage();
        cartPage.clickCheckout();

        // Act
        // Click continue button
        Logger.testStep("Click continue button");
        checkoutStepOnePage.clickContinueButton();

        // Assert
        // Correct error message should be displayed
        Logger.testStep("Verify that correct error message is displayed");
        checkoutStepOnePage.getErrorMessage().should('have.text', 'Error: First Name is required');

    });

    it('Verify that user is not able to send form with empty last name', () => {
        // Arrange
        // Add an item to cart and go to Checkout Page
        Logger.setup("Add an item to cart and go to Checkout Page");
        homePage.addFirstItemToCart();
        homePage.goToCartPage();
        cartPage.clickCheckout();

        // Act
        // Fill the form
        Logger.testStep("Fill the form");
        checkoutStepOnePage.fillFirstName(firstName);
        checkoutStepOnePage.fillPostalCode(postalCode);
        checkoutStepOnePage.clickContinueButton();

        // Assert
        // Correct error message should be displayed
        Logger.testStep("Verify that correct error message is displayed");
        checkoutStepOnePage.getErrorMessage().should('have.text', 'Error: Last Name is required');

    });

    it('Verify that user is not able to send form with empty zip code', () => {
        // Arrange
        // Add an item to cart and go to Checkout Page
        Logger.setup("Add an item to cart and go to Checkout Page");
        homePage.addFirstItemToCart();
        homePage.goToCartPage();
        cartPage.clickCheckout();

        // Act
        // Fill the form
        Logger.testStep("Fill the form");
        checkoutStepOnePage.fillFirstName(firstName);
        checkoutStepOnePage.fillLastName(lastName);
        checkoutStepOnePage.clickContinueButton();

        // Assert
        // Correct error message should be displayed
        Logger.testStep("Verify that correct error message is displayed");
        checkoutStepOnePage.getErrorMessage().should('have.text', 'Error: Postal Code is required');

    });

});
