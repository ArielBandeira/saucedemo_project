
export class LoginPage {

    // Locators
    private usernameInput = '[data-test="username"]';
    private passwordInput = '[data-test="password"]';
    private submitButton = '[type="submit"]';
    private errorMessage = '[data-test="error"]';

    // Methods

    visitLoginPage() {
        cy.visit('https://www.saucedemo.com/v1/');
    }

    fillUsername(username) {
        cy.get(this.usernameInput).type(username);
    }

    fillPassword(password) {
        cy.get(this.passwordInput).type(password);
    }

    clickSubmitButton() {
        cy.get(this.submitButton).click();
    }

    getErrorMessage = () => {
        return cy.get(this.errorMessage);
    }

}