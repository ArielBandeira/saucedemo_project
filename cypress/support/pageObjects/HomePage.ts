
export class HomePage {

    // Methods

    addFirstItemToCart() {
        cy.contains('ADD TO CART').click();
    }

    getFirstItemAddButtonText() {
        return cy.get('button.btn_inventory').first();
    }

    grabCartQuantityFromIcon() {
        return cy.get('span.shopping_cart_badge');
    }

    openSideMenu() {
        cy.get('div.bm-burger-button').click();
    }

    goToAboutPage() {
        cy.get('a[href="https://saucelabs.com/"]').click();
    }

    goToAllItemsPage() {
        cy.get('a[href="./inventory.html"]').click();
    }

    logout() {
        cy.get('a[href="./index.html"]').click();
    }

    resetAppState() {
        cy.get('a').contains('Reset App State').click();
    }

    getCurrentListOfItems() {
        return cy.get('div.inventory_item_name').then((elements) => {
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

}