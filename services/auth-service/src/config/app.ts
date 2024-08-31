// services/auth-service/src/config/app.ts

import express, { Request, Response, NextFunction } from 'express';
import { ENV } from './env';
import { AuthController } from '../infrastructure/adapters/controllers/AuthController';
import { AuthService } from '../application/services/AuthService';
import { UserRepository } from '../infrastructure/repositories/UserRepository';
import pool from './database.config';
import { RegisterUserCommand } from '../application/commands/RegisterUserCommand';
import { GetUserByEmailQuery } from '../application/queries/GetUserByEmailQuery';
import {TokenProvider} from "../infrastructure/adapters/providers/TokenProvider";
import {BcryptProvider} from "../infrastructure/adapters/providers/BcryptProvider";

// Initialize express application
const app = express();
app.use(express.json());

// Dependency injection
const userRepository = new UserRepository(pool);
const jwtAdapter = new TokenProvider();
const bcryptAdapter = new BcryptProvider();
const authService = new AuthService(userRepository, jwtAdapter, bcryptAdapter);
const authController = new AuthController(authService);

// Define routes
app.post('/register', (req: Request, res: Response, next: NextFunction) => authController.register(req, res).catch(next));
app.post('/authenticate', (req: Request, res: Response, next: NextFunction) => authController.authenticate(req, res).catch(next));

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start the server
const port = ENV.PORT;
app.listen(port, () => {
    console.log(`Auth service is running on port ${port}`);
});

export default app;
