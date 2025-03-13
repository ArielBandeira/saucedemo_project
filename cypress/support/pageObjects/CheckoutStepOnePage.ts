
export class CheckoutStepOnePage {

    // Locators
    private formArea = 'form';
    private firstNameInput = '[data-test="firstName"]';
    private lastNameInput = '[data-test="lastName"]';
    private postalCodeInput = '[data-test="postalCode"]';
    private cancelButton = 'a[href="./cart.html"]';
    private continueButton = '[type="submit"]';
    private errorMessage = '[data-test="error"]';

    // Methods
    getFormArea() {
        return cy.get(this.formArea);
    }

    fillFirstName(firstName: string) {
        cy.get(this.firstNameInput).type(firstName);
    }

    fillLastName(lastName: string) {
        cy.get(this.lastNameInput).type(lastName);
    }

    fillPostalCode(postalCode: string) {
        cy.get(this.postalCodeInput).type(postalCode);
    }

    clickCancelButton() {
        cy.get(this.cancelButton).click();
    }

    clickContinueButton() {
        cy.get(this.continueButton).click();
    }

    getErrorMessage = () => {
        return cy.get(this.errorMessage);
    }

    // Utils
    fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
        this.fillFirstName(firstName);
        this.fillLastName(lastName);
        this.fillPostalCode(postalCode);
    }

}