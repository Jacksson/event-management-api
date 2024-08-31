
export class EmailAlreadyInUseError extends Error {
    constructor(email: string) {
        super(`The email address ${email} is already in use.`);
        this.name = 'EmailAlreadyInUseError';
        // Captura el stack trace en el punto donde se lanzó el error
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, EmailAlreadyInUseError);
        }
    }
}
