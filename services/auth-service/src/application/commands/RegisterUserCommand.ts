import { RegisterUserDTO } from '../dtos/RegisterUserDTO';
import { UserRepositoryInterface } from '../../infrastructure/repositories/UserRepositoryInterface';
import {BcryptProvider} from "../../infrastructure/adapters/providers/BcryptProvider";import { User } from '../../domain/models/User';
import { EmailAlreadyInUseError } from '../errors/EmailAlreadyInUseError';

export class RegisterUserCommand {
    private readonly userRepository: UserRepositoryInterface;
    private readonly bcryptAdapter: BcryptProvider;

    constructor(userRepository: UserRepositoryInterface, bcryptAdapter: BcryptProvider) {
        this.userRepository = userRepository;
        this.bcryptAdapter = bcryptAdapter;
    }

    async execute(registerUserDTO: RegisterUserDTO): Promise<User> {
        const { email, password, firstName, lastName, role } = registerUserDTO;

        // Verificar si el email ya está en uso
        const existingUser = await this.userRepository.getUserByEmail(email);
        if (existingUser) {
            throw new EmailAlreadyInUseError(email);
        }

        // Hash de la contraseña
        const hashedPassword = await this.bcryptAdapter.hashPassword(password);

        // Crear la instancia del usuario
        const newUser = new User(
            email,
            hashedPassword,
            firstName,
            lastName,
            role || 'user'  // Asignar un rol por defecto si no se proporciona uno
        );

        // Guardar el nuevo usuario en el repositorio
        return await this.userRepository.createUser(newUser);
    }
}
