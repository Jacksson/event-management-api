import jwt from 'jsonwebtoken';
import { User } from '../../../domain/models/User';

export class TokenProvider {
    private readonly secret: string;
    private readonly expiresIn: string;

    constructor(secret: string, expiresIn: string) {
        this.secret = secret;
        this.expiresIn = expiresIn;
    }

    generateToken(user: User): string {
        return jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            this.secret,
            { expiresIn: this.expiresIn } //{ expiresIn: '1h' }
        );
    }

    verifyToken(token: string): any {
        try {
            return jwt.verify(token, this.secret);
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
}
