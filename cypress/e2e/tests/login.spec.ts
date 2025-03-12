import {LoginPage} from "../../support/pageObjects/LoginPage";

describe('Login Tests', () => {
    const loginPage = new LoginPage();
    let validUsername, validPassword, invalidPassword, invalidUsername;

    before(() => {
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
        loginPage.login(validUsername, validPassword);

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
        loginPage.login(validUsername, invalidPassword);

        // Assert
        // User is NOT redirected to home page
        // Correct error message is displayed
        cy.url().should('not.include', '/inventory.html');
        loginPage.getErrorMessage()
            .should('be.visible')
            .and('have.text', 'Epic sadface: Username and password do not match any user in this service');

    });

    it('Verify that user is NOT able to login with invalid username', () => {
        // Arrange
        // Get test data and go to login page
        loginPage.visitLoginPage();

        // Act
        // Login with valid user
        loginPage.login(invalidUsername, validPassword);

        // Assert
        // Url should not be the one rom Home Page
        // Correct error message should be displayed
        cy.url().should('not.include', '/inventory.html');
        loginPage.getErrorMessage().should('have.text', 'Epic sadface: Username and password do not match any user in this service');

    });

    it('Verify that user is NOT able to login with empty username and password', () => {
        // Arrange
        // Go to login page
        loginPage.visitLoginPage();

        // Act
        // Do no add username and password and click login button
        loginPage.clickSubmitButton();

        // Assert
        // Correct error message should be displayed
        loginPage.getErrorMessage().should('have.text', 'Epic sadface: Username is required');

    });

});