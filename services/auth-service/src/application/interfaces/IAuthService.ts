
import { UserDTO } from '../dtos/UserDTO';

export interface IAuthService {
    registerUser(userDto: UserDTO): Promise<void>;
    authenticateUser(email: string, password: string): Promise<string>;
}
