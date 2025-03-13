export class Logger {
    static info(message: string) {
        cy.log(`ℹ️ [INFO]: ${message}`);
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