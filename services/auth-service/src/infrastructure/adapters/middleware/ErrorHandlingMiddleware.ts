// services/auth-service/src/infrastructure/adapters/middleware/ErrorHandlingMiddleware.ts

import { Request, Response, NextFunction } from 'express';

export class ErrorHandlingMiddleware {
    static handleError(err: Error, req: Request, res: Response, next: NextFunction): void {
        console.error(err.stack);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
