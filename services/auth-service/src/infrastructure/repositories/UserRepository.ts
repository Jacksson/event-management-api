import { Pool } from 'pg';
import { User } from '../../domain/models/User';
import { UserRepositoryInterface } from './UserRepositoryInterface';

// Configuración de la conexión con PostgreSQL
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
});

export class UserRepository implements UserRepositoryInterface {
    // Crear un nuevo usuario
    public async createUser(user: User): Promise<User> {
        const query = `
            INSERT INTO users (email, password, first_name, last_name, role)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (email) DO UPDATE
            SET password = EXCLUDED.password,
                first_name = EXCLUDED.first_name,
                last_name = EXCLUDED.last_name,
                role = EXCLUDED.role
            RETURNING *;
        `;
        const values = [user.email, user.passwordHash, user.firstName, user.lastName, user.role];
        const result = await pool.query(query, values);

        return this.mapRowToUser(result.rows[0]);
    }

    // Obtener un usuario por su correo electrónico
    public async getUserByEmail(email: string): Promise<User | null> {
        const query = 'SELECT * FROM users WHERE email = $1';
        const result = await pool.query(query, [email]);

        if (result.rows.length === 0) {
            return null;
        }

        return this.mapRowToUser(result.rows[0]);
    }

    // Actualizar la información del usuario
    public async updateUser(user: User): Promise<User> {
        const query = `
      UPDATE users
      SET email = $1, password_hash = $2, updated_at = $3
      WHERE id = $4
      RETURNING *;
    `;
        const values = [
            user.email,
            user.firstName,
            user.lastName,
            user.passwordHash,
            user.updatedAt,
            user.id,
        ];

        const result = await pool.query(query, values);
        const row = result.rows[0];

        return this.mapRowToUser(result.rows[0]);
    }

    // Eliminar un usuario por su ID
    public async deleteUser(id: string): Promise<void> {
        const query = 'DELETE FROM users WHERE id = $1';
        const values = [id];

        await pool.query(query, values);
    }

    private mapRowToUser(row: any): User {
        return new User(
            row.id,
            row.email,
            row.firstName,
            row.lastName,
            row.role,
            row.createdAt,
            row.updatedAt
        );
    }
}
