import { Pool } from 'pg';
import { User } from '../../domain/models/User';
import { UserRepositoryInterface } from '../repositories/UserRepositoryInterface';
import { Database } from '../database/Database';

export class UserPersistence implements UserRepositoryInterface {
    private pool: Pool;

    constructor() {
        this.pool = Database.getPool();
    }

    // Método para crear un nuevo usuario en la base de datos
    async createUser(user: User): Promise<User> {
        const query = `
      INSERT INTO users (email, password_hash, first_name, last_name, role, is_active)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, email, first_name, last_name, role, created_at, updated_at, is_active
    `;
        const values = [
            user.email,
            user.passwordHash,
            user.firstName,
            user.lastName,
            user.role,
        ];

        const result = await this.pool.query(query, values);
        return result.rows[0];
    }

    // Método para obtener un usuario por su ID
    async getUserById(id: string): Promise<User | null> {
        const query = `
      SELECT id, email, first_name, last_name, role, created_at, updated_at, is_active
      FROM users
      WHERE id = $1
    `;
        const values = [id];

        const result = await this.pool.query(query, values);
        return result.rows.length > 0 ? result.rows[0] : null;
    }

    // Método para obtener un usuario por su correo electrónico
    async getUserByEmail(email: string): Promise<User | null> {
        const query = `
      SELECT id, email, first_name, last_name, role, created_at, updated_at, is_active
      FROM users
      WHERE email = $1
    `;
        const values = [email];

        const result = await this.pool.query(query, values);
        return result.rows.length > 0 ? result.rows[0] : null;
    }

    // Método para actualizar la información de un usuario existente
    async updateUser(user: User): Promise<User> {
        const query = `
      UPDATE users
      SET email = $1, first_name = $2, last_name = $3, role = $4, is_active = $5, updated_at = NOW()
      WHERE id = $6
      RETURNING id, email, first_name, last_name, role, created_at, updated_at, is_active
    `;
        const values = [
            user.email,
            user.firstName,
            user.lastName,
            user.role,
            user.id,
        ];

        const result = await this.pool.query(query, values);
        return result.rows[0];
    }

    // Método para eliminar un usuario por su ID
    async deleteUser(id: string): Promise<void> {
        const query = `DELETE FROM users WHERE id = $1`;
        const values = [id];

        await this.pool.query(query, values);
    }
}
