declare namespace Cypress {
    interface Chainable<Subject = any> {
        loginUiValidUser(): void

        goToCheckoutPageTwoWithItems(qtd:number): void
    }
}