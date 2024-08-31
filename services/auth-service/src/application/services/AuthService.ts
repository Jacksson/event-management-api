
import { RegisterUserDTO } from '../dtos/RegisterUserDTO';
import { RegisterUserCommand } from '../commands/RegisterUserCommand';
import { GetUserByEmailQuery } from '../queries/GetUserByEmailQuery';
import { User } from '../../domain/models/User';
import { EmailAlreadyInUseError } from '../errors/EmailAlreadyInUseError';
import {TokenProvider} from "../../infrastructure/adapters/providers/TokenProvider";
import {BcryptProvider} from "../../infrastructure/adapters/providers/BcryptProvider";

export class AuthService {
    private readonly registerUserCommand: RegisterUserCommand;
    private readonly getUserByEmailQuery: GetUserByEmailQuery;
    private readonly jwtAdapter: TokenProvider;
    private readonly bcryptAdapter: BcryptProvider;

    constructor(
        registerUserCommand: RegisterUserCommand,
        getUserByEmailQuery: GetUserByEmailQuery,
        jwtAdapter: TokenProvider,
        bcryptAdapter: BcryptProvider
    ) {
        this.registerUserCommand = registerUserCommand;
        this.getUserByEmailQuery = getUserByEmailQuery;
        this.jwtAdapter = jwtAdapter;
        this.bcryptAdapter = bcryptAdapter;
    }

    async registerUser(registerUserDTO: RegisterUserDTO): Promise<User> {
        // Llamar al comando para registrar un nuevo usuario
        return await this.registerUserCommand.execute(registerUserDTO);
    }

    async authenticate(email: string, password: string): Promise<string> {
        // Obtener el usuario por email
        const user = await this.getUserByEmailQuery.execute(email);
        if (!user) {
            throw new Error('Invalid email or password');
        }

        // Comparar la contraseña proporcionada con la almacenada
        const isPasswordValid = await this.bcryptAdapter.comparePassword(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        // Generar un token JWT
        const token = this.jwtAdapter.generateToken(user);
        return token;
    }
}
