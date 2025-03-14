import {HomePage} from "../../support/pageObjects/HomePage";
import {LoginPage} from "../../support/pageObjects/LoginPage";
import {ItemDetailsPage} from "../../support/pageObjects/ItemDetailsPage";
import {Logger} from "../../support/utils/logger";

describe('Home Page Tests', () => {
    const homePage = new HomePage();
    const loginPage = new LoginPage();
    const itemDetailsPage = new ItemDetailsPage();

    beforeEach(() => {
        cy.loginUiValidUser();
    });

    it('Verify that user is able to add product to cart', () => {
        // Act
        // Click on Add to Cart button
        Logger.setup("Add first item to cart");
        homePage.addFirstItemToCart();

        // Assert
        // Verify that button now says 'REMOVE'
        // Verify that cart item quantity updates to 1
        Logger.testStep("Verify that button now says 'REMOVE'");
        Logger.testStep("Verify that cart item quantity updates to 1");
        homePage.getFirstItemAddButtonText().should('have.text', 'REMOVE');
        homePage.assertCartQuantity(1);

    });

    it('Verify that user is able to go to Item Details page from the Home Page', () => {
        // Act
        Logger.setup("Go to first Item Details Page");
        homePage.getFirstItemName().first().click();

        // Assert
        Logger.testStep("Verify that user is redirected to Item Details Page");
        Logger.testStep("Verify that user is able to see item details");
        cy.url().should('include', '/inventory-item.html');
        itemDetailsPage.getItemName().should('be.visible');
    });

    it('Verify that user is able to remove product from cart on the Home page', () => {
        // Arrange
        // Add item to cart
        Logger.setup("Add first item to cart");
        homePage.addFirstItemToCart();
        homePage.assertCartQuantity(1);
        homePage.getFirstItemAddButtonText().should('have.text', 'REMOVE');

        // Act
        // Remove item from cart
        Logger.testStep("Remove item from cart");
        homePage.getFirstItemAddButtonText().click();

        // Assert
        // Verify that button now says 'ADD TO CART'
        // Verify that cart item quantity updates to 1
        Logger.testStep("Verify that button now says 'ADD TO CART'");
        Logger.testStep("Verify that cart item quantity updates to 0");
        homePage.getFirstItemAddButtonText().should('have.text', 'ADD TO CART');
        homePage.assertCartQuantity(0);

    });

    it('Verify that user is able to sort items alphabetically', () => {
        // Arrange
        // Change items organization to price (not related to the names)
        Logger.setup("Sort items by price");
        homePage.sortItemsByPriceHighToLow();

        // Organize array alphabetically, this is the expected return
        Logger.testStep("Save current items list");
        homePage.getCurrentListOfItems().then((actualItems) => {
            const manuallySorted = actualItems.slice().sort();

            // Act
            // Click on dropdown menu and select 'Name (A to Z)'
            Logger.testStep("Sort items by name");
            homePage.sortItemsByNameAtoZ();

            homePage.getCurrentListOfItems().then((currentSorting) => {

                // Assert
                // Verify that list is now organized alphabetically
                Logger.testStep("Verify that list is now organized alphabetically");
                expect(currentSorting).to.deep.equal(manuallySorted);
            });
        });

    });

    it('Verify that user is able to logout', () => {
        // Arrange
        // Open left side menu
        Logger.setup("Open left side menu");
        homePage.openSideMenu();

        // Act
        // Click Logout button
        Logger.testStep("Click Logout button");
        homePage.logout();

        // Assert
        // Verify that user is redirected to login page
        Logger.testStep("Verify that user is redirected to login page");
        Logger.testStep("Verify that user is able to see username field");
        cy.url().should('include', '/index.html');
        loginPage.getUsernameField().should('be.visible');

    });

});