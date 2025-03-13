
export class CheckoutCompletePage {

    // Locators
    private thankYouMessageHeader = 'h2.complete-header';
    private thankYouMessage = 'div.complete-text';

    // Methods
    getThankYouMessage() {
        return cy.get(this.thankYouMessageHeader).contains('THANK YOU FOR YOUR ORDER');
    }

    getMessage() {
        return cy.get(this.thankYouMessage);
    }
}