import {HomePage} from "../../support/pageObjects/HomePage";
import {CartPage} from "../../support/pageObjects/CartPage";
import {CheckoutStepOnePage}  from "../../support/pageObjects/CheckoutStepOnePage";

describe("Cart Page Tests", () => {
    const homePage = new HomePage();
    const cartPage = new CartPage();
    const checkoutStepOne = new CheckoutStepOnePage();

    beforeEach(() => {
        cy.loginUiValidUser();
    });

    it("Verify that added items appear in the cart", () => {

        // Arrange
        // Get first item name
        // Add item to cart
        // Go to Cart Page
        homePage.getFirstItemName().invoke("text").then((firstItemName) => {

            homePage.addFirstItemToCart();
            homePage.goToCartPage();

            // Act
            // Grab item name from Cart Page
            const cartItemName = cartPage.getCartItemNames().invoke("text");

            // Assert
            // Verify that Cart Page item name matches Home Page item name
            cartItemName.should("include", firstItemName);
        });

    });

    it("Verify that user can remove an item from cart", () => {
        // Arrange
        // Add item to cart
        // Go to Cart Page
        homePage.addFirstItemToCart();
        homePage.goToCartPage();

        // Act
        // Remove item from list
        cartPage.removeFirstItemFromCart();

        // Assert
        // Verify that item is removed from list
        cartPage.getCartItemNames().should("not.exist");

    });

    it("Verify that cart is empty if no product is added", () => {
        // Act
        // Go to Home Page and don't add any item to cart
        // Go to Cart Page
        homePage.goToCartPage();

        // Assert
        // Verify that items list does not show any items
        cartPage.getCartItemNames().should("not.exist");

    });

    it("Verify that 'Continue Shopping' button redirects to Home page", () => {
        // Arrange
        // Go to Cart Page
        homePage.goToCartPage();

        // Act
        // Click Continue Shopping button
        cartPage.clickContinueShopping();

        // Assert
        // Verify that user is redirected to the correct page
        // Verify that user is able to see items list
        cy.url().should('include', '/inventory.html');
        homePage.getFirstItem().should('be.visible');

    });

    it("Verify that 'Checkout' button redirects to Checkout page", () => {
        // Arrange
        // Go to Cart Page
        homePage.goToCartPage();

        // Act
        // Click Checkout button
        cartPage.clickCheckout();

        // Assert
        // Verify that user is redirected to the correct page
        // Verify that user is able to see form
        cy.url().should('include', '/checkout-step-one.html');
        checkoutStepOne.getFormArea().should('be.visible');

    });

});
