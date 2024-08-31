// src/infrastructure/repositories/UserRepositoryInterface.ts

import { User } from '../../domain/models/User';

export interface UserRepositoryInterface {
    // Método para crear un nuevo usuario
    createUser(user: User): Promise<User>;

    // Método para obtener un usuario por su correo electrónico
    getUserByEmail(email: string): Promise<User | null>;

    // Método para actualizar la información de un usuario existente
    updateUser(user: User): Promise<User>;

    // Método para eliminar un usuario por su ID
    deleteUser(id: string): Promise<void>;
}
