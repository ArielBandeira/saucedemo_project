
export class CartPage {

    // Locators
    private cartItemNames = 'div.inventory_item_name';
    private removeButton = 'button.cart_button';
    private continueShoppingBtn = 'a[href="./inventory.html"]';
    private checkoutBtn = 'a[href="./checkout-step-one.html"]';

    // Methods
    getCartItemNames() {
        return cy.get(this.cartItemNames);
    }

    removeFirstItemFromCart() {
        cy.get(this.removeButton).first().click();
    }

    clickContinueShopping() {
        cy.get(this.continueShoppingBtn).contains('Continue Shopping').click();
    }

    clickCheckout() {
        cy.get(this.checkoutBtn).click();
    }

}