
export class ItemDetailsPage {

    // Locators
    private itemName = 'div.inventory_details_name';
    private cartPage = 'a[href="./cart.html"]';

    // Methods

    getItemName() {
        return cy.get(this.itemName);
    }

    goToCartPage() {
        cy.get(this.cartPage).click();
    }

    addItemToCart() {

    }

    removeItemFromCart() {

    }
}