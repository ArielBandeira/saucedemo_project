
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

    getUsernameField() {
        return cy.get(this.usernameInput);
    }

    getPasswordField() {
        return cy.get(this.passwordInput);
    }

    fillUsername(username: string) {
        cy.get(this.usernameInput).type(username);
    }

    fillPassword(password: string) {
        cy.get(this.passwordInput).type(password);
    }

    clickSubmitButton() {
        cy.get(this.submitButton).click();
    }

    getErrorMessage = () => {
        return cy.get(this.errorMessage);
    }

    // Utils
    login(username: string, password: string) {
        this.fillUsername(username);
        this.fillPassword(password);
        this.clickSubmitButton();
    }
}