
export class CheckoutStepOnePage {

    // Locators
    private formArea = 'form';

    getFormArea() {
        return cy.get(this.formArea);
    }

}