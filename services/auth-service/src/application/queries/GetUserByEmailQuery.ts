import { UserRepositoryInterface } from '../../infrastructure/repositories/UserRepositoryInterface';
import { User } from '../../domain/models/User';

export class GetUserByEmailQuery {
    private readonly userRepository: UserRepositoryInterface;

    constructor(userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository;
    }

    async execute(email: string): Promise<User | null> {
        // Llamar al repositorio para buscar un usuario por email
        return await this.userRepository.getUserByEmail(email);
    }
}
