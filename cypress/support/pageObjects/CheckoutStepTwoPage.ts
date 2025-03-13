
export class CheckoutStepTwoPage {

    // Locators
    private summaryArea = 'div.checkout_summary_container';
    private cartItemNames = 'div.inventory_item_name';
    private cartList = 'div.cart_list';
    private summaryInformation = 'div.summary_info_label';
    private itemPrices = 'div.inventory_item_price';
    private subTotalPrice = 'div.summary_subtotal_label';
    private totalPrice = 'div.summary_total_label';
    private taxValue = 'div.summary_tax_label';
    private finishButton = 'a[href="./checkout-complete.html"]';
    private cancelButton = 'a[href="./inventory.html"]';

    // Methods
    getSummaryArea() {
        return cy.get(this.summaryArea);
    }

    getListOfItems() {
        return cy.get(this.cartItemNames);
    }

    getPaymentInformation() {
        return cy.get(this.summaryInformation).contains('Payment Information:').next().first();
    }

    getShippingInformation() {
        return cy.get(this.summaryInformation).contains('Shipping Information:').next().first();
    }

    getItemPrices() {
        return cy.get(this.itemPrices);
    }

    getTaxValue() {
        return cy.get(this.taxValue);
    }

    getSubTotalPrice() {
        return cy.get(this.subTotalPrice);
    }

    getTotalPrice() {
        return cy.get(this.totalPrice);
    }

    clickFinishButton() {
        cy.get(this.finishButton).click();
    }

    clickCancelButton() {
        cy.get(this.cancelButton).contains('CANCEL').click();
    }

    // Utils
    assertItemListQuantity(expectedQty: number) {
        if (expectedQty > 0) {
            cy.get(this.cartList).find(this.cartItemNames).should('have.length', expectedQty);
        } else {
            cy.get(this.cartList).find(this.cartItemNames).should('not.exist');
        }
    }

}