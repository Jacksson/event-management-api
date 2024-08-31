
import { UserDTO } from '../dtos/UserDTO';
import { User } from '../../domain/models/User';

export interface IUserService {
    registerUser(userDto: UserDTO): Promise<User>;
    authenticateUser(email: string, password: string): Promise<User>;
}
