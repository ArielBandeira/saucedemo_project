import {LoginPage} from "../../support/pageObjects/LoginPage";

describe('Login Tests', () => {
    const loginPage = new LoginPage();
    let validUsername, validPassword, invalidPassword, invalidUsername;

    beforeEach(() => {
        cy.fixture('users.json').then((data) => {
            validUsername = data.validUser.username;
            validPassword = data.validUser.password;
            invalidUsername = data.invalidUser.username;
            invalidPassword = data.invalidUser.password;
        });
    });

    it('Verify that user is able to login with the correct username and correct password', () => {
        // Arrange
        // Get test data and go to login page
        loginPage.visitLoginPage();

        // Act
        // Login with valid user
        loginPage.fillUsername(validUsername);
        loginPage.fillPassword(validPassword);
        loginPage.clickSubmitButton();

        // Assert
        // User is redirected to home page
        cy.url().should('include', '/inventory.html');

    });

    it('Verify that user is NOT able to login with invalid password', () => {
        // Arrange
        // Get test data and go to login page
        loginPage.visitLoginPage();

        // Act
        // Login with valid user
        loginPage.fillUsername(validUsername);
        loginPage.fillPassword(invalidPassword);
        loginPage.clickSubmitButton();

        // Assert
        // User is NOT redirected to home page
        // Correct error message is displayed
        cy.url().should('not.include', '/inventory.html');
        loginPage.getErrorMessage().should('include.text', 'Epic sadface: Username and password do not match any user in this service');

    });

    it('Verify that user is NOT able to login with invalid username', () => {
        // Arrange
        // Get test data and go to login page
        loginPage.visitLoginPage();

        // Act
        // Login with valid user
        loginPage.fillUsername(invalidUsername);
        loginPage.fillPassword(validPassword);
        loginPage.clickSubmitButton();

        // Assert
        cy.url().should('not.include', '/inventory.html');
        loginPage.getErrorMessage().should('include.text', 'Epic sadface: Username and password do not match any user in this service');
    });
});