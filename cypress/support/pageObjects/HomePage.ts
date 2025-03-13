
export class HomePage {

    // Locators
    private addToCartButton = 'button.btn_inventory';
    private cartIconBadge = 'span.shopping_cart_badge';
    private leftSideMenuButton = '.bm-burger-button';
    private itemsName = '.inventory_item_name';
    private itemLabel = '.inventory_item_label';
    private inventoryList = '.inventory_list';
    private cartPage = 'a[href="./cart.html"]';
    private logoutLink = 'a[href="./index.html"]';
    private aboutLink = 'a[href="https://saucelabs.com/"]';
    private homePageLink = 'a[href="./inventory.html"]';

    // Methods
    addFirstItemToCart() {
        cy.contains('ADD TO CART').click();
    }

    getFirstItemAddButtonText() {
        return cy.get(this.addToCartButton).first();
    }

    getFirstItem() {
        return cy.get(this.inventoryList).children().first();
    }

    getFirstItemName() {
        return cy.get(this.inventoryList).find(this.itemsName).first();
    }

    grabCartQuantityFromIcon() {
        return cy.get(this.cartIconBadge);
    }

    openSideMenu() {
        cy.get(this.leftSideMenuButton).click();
    }

    goToAboutPage() {
        cy.get(this.aboutLink).click();
    }

    goToAllItemsPage() {
        cy.get(this.homePageLink).click();
    }

    goToCartPage() {
        cy.get(this.cartPage).click();
    }

    logout() {
        cy.get(this.logoutLink).click();
    }

    getCurrentListOfItems() {
        return cy.get(this.itemsName).then((elements) => {
            const items = Array.from(elements, (element) => element.innerText);
            return items;
        });
    }

    sortItemsByNameAtoZ() {
        cy.get('select').select('Name (A to Z)');
    }

    sortItemsByNameZtoA() {
        cy.get('select').select('Name (Z to A)');
    }

    sortItemsByPriceLowToHigh() {
        cy.get('select').select('Price (low to high)');
    }

    sortItemsByPriceHighToLow() {
        cy.get('select').select('Price (high to low)');
    }

    // Utils
    goToItemDetailsPageFromFirstItem() {
        this.getFirstItemName().click();
    }

    getItemDescriptionByName(itemName: string) {
        return cy.get(this.itemLabel).contains(itemName).next().first();
    }


    getItemByName(itemName: string) {
        return cy.get(this.itemLabel).contains(itemName);
    }

    assertCartQuantity(expectedQty: number) {
        if (expectedQty > 0) {
            cy.get(this.cartIconBadge).should('have.text', expectedQty.toString());
        } else {
            cy.get(this.cartIconBadge).should('not.exist');
        }
    }

}