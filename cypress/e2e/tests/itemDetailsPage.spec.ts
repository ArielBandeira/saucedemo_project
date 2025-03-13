import {HomePage} from "../../support/pageObjects/HomePage";
import {ItemDetailsPage} from "../../support/pageObjects/ItemDetailsPage";
import {CartPage} from "../../support/pageObjects/CartPage";
import {Logger} from "../../support/utils/logger";


describe('Item Details Page', () => {
    const homePage = new HomePage();
    const itemDetailsPage = new ItemDetailsPage();
    const cartPage = new CartPage();

    beforeEach(() => {
        cy.loginUiValidUser();
    });

    it('Verify that user is able to go to Cart Page from the Details Page', () => {
        // Arrange
        // Go to Item Details Page
        Logger.setup("Add first item to cart and go to Details Page");
        homePage.addFirstItemToCart()
        homePage.goToFirstItemDetailsPage();

        // Act
        // Click Cart Button to go to Cart Page
        Logger.testStep("Go to Cart Page");
        itemDetailsPage.goToCartPage();

        // Assert
        // Verify that user is redirected to the Carts Page
        Logger.testStep("Verify that user is redirected to the Carts Page");
        Logger.testStep("Verify that user is able to see items list");
        cy.url().should('include', '/cart.html');
        cartPage.getCartItemNames().should('be.visible');

    });

    it('Verify that user is able to go back to Home Page from the Details Page', () => {
        // Arrange
        // Go to Item Details Page
        Logger.setup("Go to Details Page");
        homePage.goToFirstItemDetailsPage();

        // Act
        // Click Back button
        Logger.testStep("Click Back button");
        itemDetailsPage.clickBackButton();

        // Assert
        // Verify that user is redirected to Home Page
        Logger.testStep("Verify that user is redirected to Home Page");
        Logger.testStep("Verify that user is able to see items list");
        cy.url().should('include', '/inventory.html');
        homePage.getFirstItemName().should('be.visible');

    });

    it('Verify that user is able to see the correct item details', () => {
        // Arrange
        // Get first item information from Home Page
        Logger.setup("Get first item information from Home Page");
        homePage.getFirstItem().then((firstItemName) => {
            let itemName = firstItemName.eq(0).text();
            let itemDescription = firstItemName.eq(1).text();

            // Act
            // Go to Item Details Page from first item
            Logger.testStep("Go to Item Details Page from first item");
            homePage.goToFirstItemDetailsPage();

            // Arrange
            // Verify that item name and description matches name and description from Home Page
            Logger.testStep("Verify that item name and description matches name and description from Home Page");
            itemDetailsPage.getItemName().should('have.text', itemName);
            itemDetailsPage.getItemDescription().should('have.text', itemDescription);
        });
    });

    it('Verify that user is able to add item to cart from the Details page', () => {
        // Arrange
        // Go to Item Details Page
        Logger.setup("Go to first item Details Page");
        homePage.goToFirstItemDetailsPage();

        // Act
        // Click ADD TO CART button
        Logger.testStep("Click ADD TO CART button");
        itemDetailsPage.addItemToCart();

        // Assert
        // Verify that button now says REMOVE
        // Verify that cart icon now shows qtd 1
        Logger.testStep("Verify that button now says REMOVE");
        Logger.testStep("Verify that cart icon now shows quantity 1");
        itemDetailsPage.getAddButtonText().should('have.text', 'REMOVE');
        homePage.assertCartQuantity(1);

    });

    it('Verify that user is able to remove item from cart from the Details page', () => {
        // Arrange
        // Go to Item Details Page
        Logger.setup("Add item o cart and go to first item Details Page");
        homePage.addFirstItemToCart();
        homePage.goToFirstItemDetailsPage();

        // Go to Item Details page
        // Verify if cart icon shows qtd 1 and add button now says REMOVE
        Logger.testStep("Verify if cart icon shows qtd 1 and add button now says REMOVE");
        itemDetailsPage.getAddButtonText().should('have.text', 'REMOVE');
        homePage.assertCartQuantity(1);

        // Act
        // Click REMOVE button
        Logger.testStep("Click REMOVE button");
        itemDetailsPage.addItemToCart();

        // Assert
        // Verify that button now says REMOVE
        // Verify that cart icon now shows qtd 1
        Logger.testStep("Verify that button now says ADD TO CART");
        Logger.testStep("Verify that cart icon now shows quantity 0");
        itemDetailsPage.getAddButtonText().should('have.text', 'ADD TO CART');
        homePage.assertCartQuantity(0);

    });

    it('Verify that user is able to add item to cart from the Details page and see item on Cart Page', () => {
        // Arrange
        // Go to Item Details Page
        Logger.setup("Go to first item Details Page");
        homePage.goToFirstItemDetailsPage();

        // Get item information from Item Details page
        Logger.testStep("Get item information from Item Details page");
        itemDetailsPage.getItemName().invoke('text').then((itemNameText) => {
            itemDetailsPage.getItemDescription().invoke('text').then((itemDescriptionText) => {

                // Act
                // Add item to cart
                Logger.testStep("Add item to cart");
                itemDetailsPage.addItemToCart();
                itemDetailsPage.getAddButtonText().should('have.text', 'REMOVE');
                homePage.assertCartQuantity(1);

                // Go to cart page
                Logger.testStep("Go to cart page");
                itemDetailsPage.goToCartPage();

                // Assert
                // Verify that Cart page has the same item name
                Logger.testStep("Verify that Cart page has the same item name and description");
                cartPage.getCartItemNames().first().should('have.text', itemNameText);
                cartPage.getCartItemDescription().first().should('have.text', itemDescriptionText);
            });
        });
    });

});