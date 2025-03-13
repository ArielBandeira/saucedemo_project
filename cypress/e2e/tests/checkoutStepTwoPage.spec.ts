import {HomePage} from "../../support/pageObjects/HomePage";
import {CheckoutStepTwoPage} from "../../support/pageObjects/CheckoutStepTwoPage";
import {CheckoutCompletePage} from "../../support/pageObjects/CheckoutCompletePage";
import {Logger} from "../../support/utils/logger";


describe('Checkout Page Step Two Tests', () => {
    const homePage = new HomePage();
    const checkoutStepTwoPage = new CheckoutStepTwoPage();
    const checkoutCompletePage = new CheckoutCompletePage();
    let paymentInformation:string, shippingInformation:string;

    before(() => {
        cy.fixture('users.json').then((data) => {
            paymentInformation = data.validUser.paymentInformation;
            shippingInformation = data.validUser.shippingInformation;
        });
    })

    beforeEach(() => {
        cy.loginUiValidUser();
    });

    it('Verify that user is able to see correct Cart Information in Checkout Step Two Page', () => {
        // Arrange
        // Grab the item title
        Logger.setup("Go to Home Page and save first item information");
        homePage.getFirstItemName().then((element) => {

            // Act
            // Add 3 items to cart
            // Go to checkout step two page
            Logger.testStep("Add 3 items to cart");
            cy.goToCheckoutPageTwoWithItems(3);

            // Assert
            // Verify that each listed item shows correct name, price, and quantity
            // Verify that quantity of items is correct
            Logger.testStep("Verify first item added shows on the list");
            Logger.testStep("Verify that car icon badge shows correct quantity of items");
            checkoutStepTwoPage.getListOfItems().should('include.text', element.text());
            homePage.assertCartQuantity(3);
            checkoutStepTwoPage.assertItemListQuantity(3);

        });
    });

    it('Verify that user is able to see correct Payment and Shipping Information in Checkout Step Two Page', () => {
        // Act
        // Add 2 items to cart
        // Go to checkout step two page
        Logger.setup("Add 2 items to cart and go to checkout page two");
        cy.goToCheckoutPageTwoWithItems(2);

        // Assert
        // Verify that the payment information is the expected
        Logger.testStep("Verify that payment information is correct");
        Logger.testStep("Verify that shipping information is correct");
        checkoutStepTwoPage.getPaymentInformation().should('have.text', paymentInformation);
        checkoutStepTwoPage.getShippingInformation().should('have.text', shippingInformation);

    });

    it('Verify that user is able to see correct Total amount (items + tax) calculation in Checkout Step Two Page', () => {
        // Arrange
        // Add 3 items to cart and go to checkout page two
        Logger.setup("Add 3 items to cart and go to checkout page two");
        cy.goToCheckoutPageTwoWithItems(3);

        // Act
        // Get list of item prices
        Logger.testStep("Get list of item prices");
        checkoutStepTwoPage.getItemPrices().then(($prices) => {
            const priceValues: number[] = [];

            // Get only the numbers and not the '$' icon
            // Change values to type number
            // Add each value to the number array 'priceValues'
            for (let i = 0; i < $prices.length; i++) {
                const priceText = $prices[i].innerText.replace('$', '').trim();
                const price = parseFloat(priceText);
                priceValues.push(price);
            }

            // Get sum of number in the array
            let subTotal = 0;
            for (let i = 0; i < 3; i++) {
                subTotal += priceValues[i];
            }

            // Add Tax value to the total
            Logger.testStep("Add Tax value to the total");
            checkoutStepTwoPage.getTaxValue().then(($tax) => {
                const taxValue = $tax.text().replace('Tax: $', '').trim();
                const taxNumberValue = parseFloat(taxValue);

                // Total value = Sub Total + Tax
                const totalValue = subTotal + taxNumberValue;

                // Assert
                Logger.testStep("Verify that sub total value is correct");
                Logger.testStep("Verify that total value is correct");
                checkoutStepTwoPage.getSubTotalPrice().should('have.text', 'Item total: $' + subTotal);
                checkoutStepTwoPage.getTotalPrice().should('have.text', 'Total: $' + totalValue);
            });
        });

    });

    it('Verify that user is able to finish the purchase in the Checkout page', () => {
        // Arrange
        // Add 1 item to cart and go to checkout page two
        Logger.setup("Add 1 item to cart and go to checkout page two");
        cy.goToCheckoutPageTwoWithItems(1);

        // Act
        // Click finish button
        Logger.testStep("Click finish button");
        checkoutStepTwoPage.clickFinishButton();

        // Assert
        Logger.testStep("Verify that user is redirected to the correct page");
        Logger.testStep("Verify that user is able to see thank you message");
        cy.url().should('include', '/checkout-complete.html');
        checkoutCompletePage.getThankYouMessage().should('be.visible');
    });

    it('Verify that user is able to cancel the purchase in the Checkout page', () => {
        // Arrange
        // Add 1 item to cart and go to checkout page two
        Logger.setup("Add 1 item to cart and go to checkout page two");
        cy.goToCheckoutPageTwoWithItems(1);

        // Act
        // Click finish button
        Logger.testStep("Click cancel button");
        checkoutStepTwoPage.clickCancelButton();

        // Assert
        Logger.testStep("Verify that user is redirected to the correct page");
        Logger.testStep("Verify that user is able to see first item in items list");
        cy.url().should('include', '/inventory.html');
        homePage.getFirstItemName().should('be.visible');

    });

});