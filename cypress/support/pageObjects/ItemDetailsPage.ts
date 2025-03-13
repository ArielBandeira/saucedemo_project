
export class ItemDetailsPage {

    // Locators
    private itemName = 'div.inventory_details_name';
    private itemDescription = 'div.inventory_details_desc';
    private cartPage = 'a[href="./cart.html"]';
    private backButton = 'button.inventory_details_back_button';
    private addToCartButton = 'button.btn_inventory';

    // Methods

    getItemName() {
        return cy.get(this.itemName);
    }

    getItemDescription() {
        return cy.get(this.itemDescription);
    }

    goToCartPage() {
        cy.get(this.cartPage).click();
    }

    clickBackButton() {
        cy.get(this.backButton).click({force: true});
    }

    addItemToCart() {
        cy.get(this.addToCartButton).click();
    }

    getAddButtonText() {
        return cy.get(this.addToCartButton);
    }

    removeItemFromCart() {

    }
}