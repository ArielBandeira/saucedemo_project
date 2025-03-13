import {HomePage} from "../../support/pageObjects/HomePage";
import {CartPage} from "../../support/pageObjects/CartPage";
import {CheckoutStepOnePage}  from "../../support/pageObjects/CheckoutStepOnePage";
import {Logger} from "../../support/utils/logger";

describe('Cart Page Tests', () => {
    const homePage = new HomePage();
    const cartPage = new CartPage();
    const checkoutStepOne = new CheckoutStepOnePage();

    beforeEach(() => {
        cy.loginUiValidUser();
    });

    it('Verify that added items appear in the cart', () => {

        // Arrange
        // Get first item name
        // Add item to cart
        // Go to Cart Page
        Logger.setup("Get first item name and add item to cart");
        homePage.getFirstItemName().invoke('text').then((firstItemName) => {

            homePage.addFirstItemToCart();
            homePage.goToCartPage();

            // Act
            // Get item name from Cart Page
            Logger.testStep("Get item name from Cart Page");
            const cartItemName = cartPage.getCartItemNames().invoke('text');

            // Assert
            // Verify that Cart Page item name matches Home Page item name
            Logger.testStep("Verify that Cart Page item name matches Home Page item name");
            cartItemName.should('include', firstItemName);
        });

    });

    it('Verify that user can remove an item from cart', () => {
        // Arrange
        // Add item to cart
        // Go to Cart Page
        Logger.setup("Add first item to cart and go to Cart Page");
        homePage.addFirstItemToCart();
        homePage.goToCartPage();

        // Act
        // Remove item from list
        Logger.testStep("Remove item from list");
        cartPage.removeFirstItemFromCart();

        // Assert
        // Verify that item is removed from list
        Logger.testStep("Verify that item is removed from list");
        cartPage.getCartItemNames().should('not.exist');

    });

    it('Verify that cart is empty if no product is added', () => {
        // Act
        // Go to Home Page and don't add any item to cart
        // Go to Cart Page
        Logger.setup("Go to Home Page and don't add any item to cart");
        homePage.goToCartPage();

        // Assert
        // Verify that items list does not show any items
        Logger.testStep("Verify that items list does not show any items");
        cartPage.getCartItemNames().should('not.exist');

    });

    it('Verify that Continue Shopping button redirects to Home page', () => {
        // Arrange
        // Go to Cart Page
        Logger.setup("Go to Cart Page");
        homePage.goToCartPage();

        // Act
        // Click Continue Shopping button
        Logger.testStep("Click Continue Shopping button");
        cartPage.clickContinueShopping();

        // Assert
        // Verify that user is redirected to the correct page
        // Verify that user is able to see items list
        Logger.testStep("Verify that user is redirected to the correct page");
        Logger.testStep("Verify that user is able to see items list");
        cy.url().should('include', '/inventory.html');
        homePage.getFirstItemName().should('be.visible');

    });

    it('Verify that Checkout button redirects to Checkout page', () => {
        // Arrange
        // Go to Cart Page
        Logger.setup("Go to Cart Page");
        homePage.goToCartPage();

        // Act
        // Click Checkout button
        Logger.testStep("Click Checkout button");
        cartPage.clickCheckout();

        // Assert
        // Verify that user is redirected to the correct page
        // Verify that user is able to see form
        Logger.testStep("Verify that user is redirected to the correct page");
        Logger.testStep("Verify that user is able to see form area");
        cy.url().should('include', '/checkout-step-one.html');
        checkoutStepOne.getFormArea().should('be.visible');

    });

});
