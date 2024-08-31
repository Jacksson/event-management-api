// services/auth-service/src/infrastructure/adapters/middleware/AuthMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import { TokenProvider } from '../providers/TokenProvider';
import e from "cors";

export class AuthMiddleware {
    constructor(private readonly tokenProvider: TokenProvider) {}

    authenticateToken(req: Request, res: Response, next: NextFunction): any {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(403).json({ message: 'Token is required' });
        }

        try {
            const user = this.tokenProvider.verifyToken(token);
            req.user = user;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Invalid token' });
        }
    }
}
