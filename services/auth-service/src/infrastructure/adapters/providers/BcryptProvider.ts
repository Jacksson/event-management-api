import bcrypt from 'bcrypt';

export class BcryptProvider {
    private readonly saltRounds: number;

    constructor(saltRounds: number) {
        this.saltRounds = saltRounds;
    }

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, this.saltRounds);
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}
