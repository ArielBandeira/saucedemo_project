import {HomePage} from "../../support/pageObjects/HomePage";


describe('Item Details Page', () => {
    const homePage = new HomePage();

    beforeEach(() => {
        cy.loginUiValidUser();
    });

    it.only('Verify that user is able to go to Cart Page from the Details Page', () => {
        // Arrange
        // Open an item on the Item Details Page
        homePage.getFirstItem().then(item => {

            const itemName = item.children().eq(1).text();
            //const itemDescription = item.children().eq(1).text();

            console.log(item.children().eq(1).eq(2).text());

        });

    });

    it('Verify that user is able to go back to Home Page from the Details Page', () => {

    });

    it('Verify that user is able to see the correct item details', () => {

    });

    it('Verify that user is able to add item to cart from the Details page', () => {

    });

    it('Verify that user is able to remove item from cart from the Details page', () => {

    });
})