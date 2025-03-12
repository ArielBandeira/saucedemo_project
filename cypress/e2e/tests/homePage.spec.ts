import {HomePage} from "../../support/pageObjects/HomePage";

describe('Home Page Tests', () => {
    const homePage = new HomePage();

    beforeEach(() => {
        cy.loginUiValidUser();
    });

    it('Verify that user is able to add product to cart', () => {
        // Act
        // Click on Add to Cart button
        homePage.addFirstItemToCart();

        // Assert
        // Verify that button now says 'REMOVE'
        // Verify that cart item quantity updates to 1
        homePage.getFirstItemAddButtonText().should('have.text', 'REMOVE');
        homePage.assertCartQuantity(1);

    });

    it('Verify that user is able to remove product from cart on the Home page', () => {
        // Arrange
        // Add item to cart
        homePage.addFirstItemToCart();
        homePage.assertCartQuantity(1);
        homePage.getFirstItemAddButtonText().should('have.text', 'REMOVE');

        // Act
        // Remove item from cart
        homePage.getFirstItemAddButtonText().click();

        // Assert
        // Verify that button now says 'ADD TO CART'
        // Verify that cart item quantity updates to 1
        homePage.getFirstItemAddButtonText().should('have.text', 'ADD TO CART');
        homePage.assertCartQuantity(0);

    });

    it('Verify that user is able to sort items alphabetically', () => {
        // Arrange
        // Change items organization to price (not related to the names)
        homePage.sortItemsByPriceHighToLow();

        // Organize array alphabetically, this is the expected return
        homePage.getCurrentListOfItems().then((actualItems) => {
            const manuallySorted = actualItems.slice().sort();

            // Act
            // Click on dropdown menu and select 'Name (A to Z)'
            homePage.sortItemsByNameAtoZ();

            homePage.getCurrentListOfItems().then((currentSorting) => {

                // Assert
                // Verify that list is now organized alphabetically
                expect(currentSorting).to.deep.equal(manuallySorted);
            });
        });
    });

    it('Verify that user is able to logout', () => {
        // Arrange
        // Open left side menu
        homePage.openSideMenu();

        // Act
        // Click Logout button
        homePage.logout();

        // Assert
        // Verify that user is redirected to login page
        cy.url().should('include', '/index.html');
    });

});