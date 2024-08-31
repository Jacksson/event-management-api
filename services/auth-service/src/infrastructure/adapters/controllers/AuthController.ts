import { Request, Response } from 'express';
import { AuthService } from '../../../application/services/AuthService';
import { RegisterUserDTO } from '../../../application/dtos/RegisterUserDTO';
import { RegisterUserCommand } from '../../../application/commands/RegisterUserCommand';
import { GetUserByEmailQuery } from '../../../application/queries/GetUserByEmailQuery';
import { EmailAlreadyInUseError } from '../../../application/errors/EmailAlreadyInUseError';

export class AuthController {
    private readonly authService: AuthService;

    constructor(authService: AuthService) {
        this.authService = authService;
    }

    async register(req: Request, res: Response): Promise<void> {
        const registerUserDTO: RegisterUserDTO = req.body;

        try {
            // Registrar un nuevo usuario
            const user = await this.authService.registerUser(registerUserDTO);
            res.status(201).json(user);
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                res.status(409).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }

    async authenticate(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        try {
            // Autenticar al usuario y obtener un token
            const token = await this.authService.authenticate(email, password);
            res.status(200).json({ token });
        } catch (error) {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    }
}
