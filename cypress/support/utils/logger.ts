export class Logger {
    static setup(message: string) {
        cy.log(`ℹ️ [TEST SETUP]: ${message}`);
    }

    static testStep(message: string) {
        cy.log(`ℹ️ [TEST STEP]: ${message}`);
    }

    static warn(message: string) {
        cy.log(`⚠️ [WARN]: ${message}`);
    }

    static error(message: string) {
        cy.log(`❌ [ERROR]: ${message}`);
    }

    static success(message: string) {
        cy.log(`✅ [SUCCESS]: ${message}`);
    }

}