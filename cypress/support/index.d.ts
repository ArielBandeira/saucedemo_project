declare namespace Cypress {
    interface Chainable<Subject = any> {
        loginUiValidUser(): void
    }
}