import {HomePage} from "../../support/pageObjects/HomePage";
import {CheckoutStepTwoPage} from "../../support/pageObjects/CheckoutStepTwoPage";
import {CheckoutCompletePage} from "../../support/pageObjects/CheckoutCompletePage";


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
        homePage.getFirstItemName().then((element) => {

            // Act
            // Add 3 items to cart
            // Go to checkout step two page
            cy.goToCheckoutPageTwoWithItems(3);

            // Assert
            // Verify that each listed item shows correct name, price, and quantity
            // Verify that quantity of items is correct
            checkoutStepTwoPage.getListOfItems().should('include.text', element.text());
            homePage.assertCartQuantity(3);
            checkoutStepTwoPage.assertItemListQuantity(3);

        });
    });

    it('Verify that user is able to see correct Payment and Shipping Information in Checkout Step Two Page', () => {
        // Act
        // Add 2 items to cart
        // Go to checkout step two page
        cy.goToCheckoutPageTwoWithItems(2);

        // Assert
        // Verify that the payment information is the expected
        checkoutStepTwoPage.getPaymentInformation().should('have.text', paymentInformation);
        checkoutStepTwoPage.getShippingInformation().should('have.text', shippingInformation);

    });

    it('Verify that user is able to see correct Total amount (items + tax) calculation in Checkout Step Two Page', () => {
        // Arrange
        // Add 3 items to cart and go to checkout page two
        cy.goToCheckoutPageTwoWithItems(3);

        // Act
        // Get list of item prices
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
            checkoutStepTwoPage.getTaxValue().then(($tax) => {
                const taxValue = $tax.text().replace('Tax: $', '').trim();
                const taxNumberValue = parseFloat(taxValue);

                // Total value = Sub Total + Tax
                const totalValue = subTotal + taxNumberValue;

                // Assert
                checkoutStepTwoPage.getSubTotalPrice().should('have.text', 'Item total: $' + subTotal);
                checkoutStepTwoPage.getTotalPrice().should('have.text', 'Total: $' + totalValue);
            });
        });

    });

    it('Verify that user is able to finish the purchase in the Checkout page', () => {
        // Arrange
        // Add 1 item to cart and go to checkout page two
        cy.goToCheckoutPageTwoWithItems(1);

        // Act
        // Click finish button
        checkoutStepTwoPage.clickFinishButton();

        // Assert
        cy.url().should('include', '/checkout-complete.html');
        checkoutCompletePage.getThankYouMessage().should('be.visible');
    });

    it('Verify that user is able to cancel the purchase in the Checkout page', () => {
        // Arrange
        // Add 1 item to cart and go to checkout page two
        cy.goToCheckoutPageTwoWithItems(1);

        // Act
        // Click finish button
        checkoutStepTwoPage.clickCancelButton();

        // Assert
        cy.url().should('include', '/inventory.html');
        homePage.getFirstItemName().should('be.visible');

    });

});