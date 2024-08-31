export class User {
    public id: string;
    public email: string;
    public passwordHash: string;
    public firstName: string;
    public lastName: string;
    public role?: string;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(
        id: string,
        email: string,
        firstName: string,
        lastName: string,
        passwordHash: string,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.passwordHash = passwordHash;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Método para actualizar el hash de la contraseña
    public updatePasswordHash(newPasswordHash: string): void {
        this.passwordHash = newPasswordHash;
        this.updatedAt = new Date();
    }

    // Método para actualizar la información del usuario
    public updateEmail(newEmail: string): void {
        this.email = newEmail;
        this.updatedAt = new Date();
    }
}
