// services/auth-service/src/infrastructure/adapters/mappers/UserMapper.ts

import { User } from '../../../domain/models/User';
import {UserDTO} from "../../../application/dtos/UserDTO";

export class UserMapper {
    static toDTO(data: any): UserDTO {
        return {
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            role: data.role || 'user',
        };
    }

    static toResponse(user: User): any {
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
    }
}
